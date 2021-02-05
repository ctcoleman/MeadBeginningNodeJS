import express from 'express'
import Task from '../models/task.js'

const router = new express.Router()

// ---- TASKS ----
// use express http post method to POST task data to mongodb
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch(e) {
    res.status(400).send(e)
  }
})

// use express http get method to GET tasks form the mongodb
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.send(tasks)
  } catch(e) {
    res.status(500).send('I beleive something went wrong, sir...')
  }
})

// use express http get method to GET a specific task from the mongodb
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const task = await Task.findById(_id)
    res.send(task)
  } catch(e) {
    res.status(404).send('I beleive something went wrong, sir...')
  }
})

// use express patch method to update documents from the mongodb
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const validUpdates = ['completed', 'description']
  const isValid = updates.every(update => validUpdates.includes(update))

  if(!isValid) {
    return res.status(400).send({ error: 'I\'m unable to update that value, sir...' })
  }

  try {
    const task = await Task.findById(req.params.id)
    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })

    if(!task) {
      return res.status(404).send('I wasn\'t able to locate that task, sir...')
    }

    res.send(task)
  } catch(e) {
    res.status(400).send('I believe something went wrong, sir...')
  }
})

// use express delete method to remove document from the mongod
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!task) {
      res.status(404).send()
    }

    res.send(task)
  } catch(e) {
    res.status(400).send('I believe something went wrong, sir...' + e)
  }
})


export default router