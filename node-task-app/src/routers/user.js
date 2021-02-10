import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import User from '../models/user.js'
import auth from '../middleware/auth.js'
import { sendWelcomeEmail, sendCancelEmail } from '../emails/account.js'

// -- instantiate router --
const router = new express.Router()

// -- multer upload config --
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jp(|e)g|png)$/)) {
      return cb(new Error('please upload an image'))
    }

    cb(undefined, true)
  }
})

// -- create account --
router.post('/users', async (req, res) => { // async returns promis
  const user = new User(req.body)

  // If succuss vs. if failed
  try {
    await user.save() // first perform this
    sendWelcomeEmail(user.email, user.name) // send welcome email
    const token = await user.generateAuthToken() // generate token AFTER the user is successfully saved
    res.status(201).send({ user, token }) // if successful send user data
  } catch(e) {
    res.status(400).send(e)
  }

  // Old method w/o async - await
  // user.save()
  //   .then(() => res.status(201).send(user))
  //   .catch(e => res.status(400).send(e))
})

// -- log in --
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch(e) {
    res.status(400).send()
  }
})

// -- log out from active session --
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()

    res.send('Sucessfully logged out, sir...')
  } catch(e) {
    res.status(500).send({ error: 'invalid entery' })
  }
})

// -- log out of all sessions --
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send('SUCCESS')
  } catch(e) {
    res.status(500).send({ error: 'invalid entery' })
  }
})

// -- get profile data --
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// -- update user profile data
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValid = updates.every(update => allowedUpdates.includes(update))

  if(!isValid) {
    return res.status(400).send({ error: 'invalid entery' })
  }

  try {
    const user = await User.findById(req.user._id)
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user)
  } catch(e) {
    res.status(400).send({ error: 'UNSUCCESSFUL' })
  }
})

// -- delete profile --
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendCancelEmail(req.user.email, req.user.name)
    res.send({ success: 'good bye' })
  } catch(e) {
    res.status(400).send({ error: e })
  }
})

// -- upload user profile image --
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

  req.user.avatar = buffer
  await req.user.save()

  res.status(202).send({ success: 'successfully uploaded the avatar' })
}, (err, req, res, next) => {
  res.status(400).send({ error: err.message })
})

// -- delete user profile image --
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()

  res.status(200).send({ success: 'successfully removed the avatar'})
});

// -- get user profile image --
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    if(!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')

    res.send(user.avatar)
  } catch(e) {
    res.status(404).send()
  }
})

export default router