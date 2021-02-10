import mongoose from 'mongoose'

export default mongoose.connect(process.env.MONGODB_LOCATION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})