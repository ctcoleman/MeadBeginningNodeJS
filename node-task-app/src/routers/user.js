import express from 'express'
import multer from 'multer'
import User from '../models/user.js'
import auth from '../middleware/auth.js'

const router = new express.Router()


const upload = multer({
  dest: 'images/avatars',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jp(|e)g|png)$/)) {
      return cb('Please upload an image')
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
    res.status(500).send('I was unable to log you out successfully, sir...')
  }
})

// -- log out of all sessions --
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send('Successfully logged out of all sessions, sir...')
  } catch(e) {
    res.status(500).send('I was unable to log out of all sessions, sir...')
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
    return res.status(400).send({ error: 'I\'m unable to update that property, sir...' })
  }

  try {
    const user = await User.findById(req.user._id)
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user)
  } catch(e) {
    res.status(400).send('There seems to be something wrong, sir...')
  }
})

// -- delete profile --
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send('SUCCESS - successfully removed your profile, sir...good bye')
  } catch(e) {
    res.status(400).send('There seems to be something wrong, sir....' + e)
  }
})

// -- upload user profile image --
router.post('/users/me/avatar', upload.single('avatar'), async (req, res) => {
  res.status(202).send('SUCCESS')
})

export default router