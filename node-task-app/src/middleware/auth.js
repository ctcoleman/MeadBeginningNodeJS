import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findOne({ _id:decoded._id, 'tokens.token':token })

    if(!user) {
      throw new Error
    }
    
    req.token = token
    req.user = user
    next()
  } catch(e) {
    res.status(401).send('Please authenticate yourself before performing this action, sir...')
  } 
}

export default auth