import express from 'express'
import Task from '../models/task.js'
import auth from '../middleware/auth.js'

const router = new express.Router()

// ---- TASKS ----
// -- create a new task ---
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, createdBy: req.user._id })

  try {
    await task.save()
    res.status(201).send(task)
  } catch(e) {
    res.status(400).send(e)
  }
})

// -- get tasks on your profile -- 
// filtering - pagination - sorting
// ---> GET /tasks?completed=true||false
// ---> GET /tasks?limit=10&skip=30 = 3rd page of 10 results
// ---> GET /tasks?sortBy=createdAt:asc||:desc = ascending or descending order by x
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {}
  const limit = parseInt(req.query.limit)
  const skip = parseInt(req.query.skip)

  if(req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit,
        skip,
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch(e) {
    res.status(500).send('UNSUCCESSFUL - There aren\'t any tasks in the database associated with your profile, sir...')
  }
})

// -- get a specific tasks --
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id
  
  try {
    const task = await Task.findOne({ _id, createdBy: req.user._id })
    if(!task) {
      throw new Error
    }
    res.send(task)
  } catch(e) {
    res.status(404).send('UNSUCCESSFUL - I couldn\'t find that task, sir...')
  }
})

// -- update task(s) --
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const validUpdates = ['completed', 'description']
  const isValid = updates.every(update => validUpdates.includes(update))

  if(!isValid) {
    return res.status(400).send({ error: 'UNSUCCESSFUL - I\'m unable to update that value, sir...' })
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id })
    if(!task) {
      return res.status(404).send('UNSUCCESSFUL - I couldn\'t find that task, sir...')
    }

    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })

    if(!task) {
      return res.status(404).send('UNSUCCESSFUL - I wasn\'t able to locate that task, sir...')
    }

    res.send(task)
  } catch(e) {
    res.status(400).send('UNSUCCESSFUL - I believe something went wrong, sir...')
  }
})

// -- delete a task --
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })

    if(!task) {
      return res.status(404).send('UNSUCCESSFUL - I couldn\'t find that task to remove it, sir...')
    }

    res.send(task)
  } catch(e) {
    res.status(400).send('UNSUCCESSFUL - I believe something went wrong, sir...' + e)
  }
})


export default router