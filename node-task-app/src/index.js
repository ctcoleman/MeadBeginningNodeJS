import express from 'express'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'
import './db/mongoose.js'

const app = express()
// process.env.PORT -> Heroku config else localhost 3000
const port = process.env.PORT || 3000

// use express methods to parse incoming data to json
app.use(express.json())
// run router
app.use(userRouter)
app.use(taskRouter)

// use express to listen on port defined above
app.listen(port, () => console.log(`Server up on port ${port}`))

