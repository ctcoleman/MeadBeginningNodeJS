import express from 'express'
import User from './models/user.js'
import Task from './models/task.js'
import './db/mongoose.js'

const app = express()
const port = process.env.PORT || 3000

// use express methods to parse incoming data to json
app.use(express.json())

// use express http post method to POST user data to mongodb
app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save()
    .then(() => res.status(201).send(user))
    .catch(e => res.status(400).send(e))
})

// use express http get method to GET user data from the mongodb
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(e => res.status(500).send())
})

// use express http get method to GET a specific user data from the mongodb
app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  
  User.findById(_id)
    .then(user => res.send(user))
    .catch(e => res.status(404).send())
})

// use express http post method to POST task data to mongodb
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task.save()
    .then(() => res.status(201).send(task))
    .catch(e => res.status(400).send(e))
})

// use express http get method to GET tasks form the mongodb
app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.send(tasks))
    .catch(e => res.status(500).send())
})

// use express http get method to GET a specific task from the mongodb
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id
  
  Task.findById(_id)
    .then(task => res.send(task))
    .catch(e => res.status(404).send())
})

// use express listen method to set the port for the server to listen on
app.listen(port, () => console.log(`Server up on port ${port}`))

