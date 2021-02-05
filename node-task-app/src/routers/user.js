import express from 'express'
import User from '../models/user.js'

const router = new express.Router()

// Generate token for saved user
// Send back token and user
// Create a new user and test

// ---- USERS ----
// use express and http to create a new user and save to mongodb
router.post('/users', async (req, res) => { // async returns promis
  const user = new User(req.body)

  // If succuss vs. if failed
  try {
    await user.save() // first perform this
  const token = await user.generateAuthToken() // generate token AFTER the user is successfully saved
    res.status(201).send({ user, token }) // if successful perform this
  } catch(e) {
    res.status(400).send(e)
  }

  // Old method w/o async - await
  // user.save()
  //   .then(() => res.status(201).send(user))
  //   .catch(e => res.status(400).send(e))
})


// use express http get method to GET user data from the mongodb
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(500).send('I beleive something went wrong, sir...')
  }
})

// use expres and router to log user in
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(e) {
    res.status(400).send()
  }
})

// use express http get method to GET a specific user data from the mongodb
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send(user)
  } catch(e) {
    res.status(404).send('I beleive something went wrong, sir...')
  }
})

// use express patch method to update document form mongodb
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValid = updates.every(update => allowedUpdates.includes(update))

  if(!isValid) {
    return res.status(400).send({ error: 'I\'m unable to update that property, sir...' })
  }

  try {
    const user = await User.findById(req.params.id)
    updates.forEach(update => user[update] = req.body[update])
    await user.save()

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
    //   new: true,
    //   runValidators: true
    // })

    if(!user) {
      return res.status(404).send('I wasn\'t able to locate that user, sir...')
    }

    res.send(user)
  } catch(e) {
    res.status(400).send('There seems to be something wrong, sir...' + e)
  }
})

// use express delete method to remove user documents from mongodb
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user) {
      return res.status(404).send('I couldn\'t find that user sir..')
    }

    res.send(user)
  } catch(e) {
    res.status(400).send('There seems to be something wrong, sir....' + e)
  }
})

export default router