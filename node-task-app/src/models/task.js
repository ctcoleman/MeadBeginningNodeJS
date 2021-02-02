import mongoose from 'mongoose'

// --- TASKS ---
// Create a new Task object using the Task constructor
const Task = mongoose.model('Task',{
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: false
  }
})

export default Task