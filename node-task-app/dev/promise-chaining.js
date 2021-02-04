import '../src/db/mongoose.js'
import User from '../src/models/user.js'

// User.findByIdAndUpdate('6018ced38dbaa67e33b9073c', { age: 1 })
//   .then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
//   })
//   .then(result => console.log(result))
//   .catch(e => console.log(e))

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('6018c984cfa5717888f6102c', 22)
  .then(count => console.log(count))
  .catch(e => console.log(e))


