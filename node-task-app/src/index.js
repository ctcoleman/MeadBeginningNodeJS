import express from 'express'
import User from './models/user.js'
import Task from './models/task.js'
import './db/mongoose.js'

const app = express()
const port = process.env.PORT || 3000

// use express methods to parse incoming data to json
app.use(express.json())

// ---- USERS ----
// use express http post method to POST user data to mongodb
app.post('/users', async (req, res) => { // async returns promis
  const user = new User(req.body)

  // If succuss vs. if failed
  try {
    await user.save() // first perform this
    res.status(201).send(user) // if successful perform this
  } catch(e) {
    res.status(400).send(e)
  }

  // Old method w/o async - await
  // user.save()
  //   .then(() => res.status(201).send(user))
  //   .catch(e => res.status(400).send(e))
})

// use express http get method to GET user data from the mongodb
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(500).send('I beleive something went wrong, sir...')
  }
})

// use express http get method to GET a specific user data from the mongodb
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const user = await User.findById(_id)
    res.send(user)
  } catch(error) {
    res.status(404).send('I beleive something went wrong, sir...')
  }
})

// ---- TASKS ----
// use express http post method to POST task data to mongodb
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch(e) {
    res.status(400).send(e)
  }
})

// use express http get method to GET tasks form the mongodb
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.send(tasks)
  } catch(e) {
    res.status(500).send('I beleive something went wrong, sir...')
  }
})

// use express http get method to GET a specific task from the mongodb
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const task = await Task.findById(_id)
    res.send(task)
  } catch(e) {
    res.status(404).send('I beleive something went wrong, sir...')
  }
})

// use express listen method to set the port for the server to listen on
app.listen(port, () => console.log(`Server up on port ${port}`))

