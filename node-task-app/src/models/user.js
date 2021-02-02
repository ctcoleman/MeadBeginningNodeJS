import mongoose from 'mongoose'
import validator from 'validator'

// --- USERS ---
// create the User constructor using mongoose model function
// returns a MongoDB Document
const User = mongoose.model('User', {
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Please enter a valid email, sir...')
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if(value <= 0) {
        throw new Error('Please enter a valid age, sir...')
      }
    }
  },
  password: {
    type: String,
    trim: true,
    minLength: 7,
    required: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('please enter a valid password, sir...')
      }
    }
  }
})

export default User