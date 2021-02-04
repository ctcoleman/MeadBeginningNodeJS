import '../src/db/mongoose.js'
import Task from '../src/models/task.js'

// Task.findByIdAndDelete('6018cd0f1f1e637b5f5422fa')
//   .then(task => Task.countDocuments({ completed: false }))
//   .then(toDos => console.log(toDos))
//   .catch(e => console.log(e))

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('6018cc711f1e637b5f5422f7')
  .then(count => console.log(count))
  .catch(e => console.log(e))