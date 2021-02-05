import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'abcdefg123')
  
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user) {
    throw new Error('I wasn\'t able to log you in, sir...')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('I wasn\'t able to log you in, sir...')
  }

  return user
}

// Hash password when change is made
userSchema.pre('save', async function(next) {
  const user = this

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

export default User