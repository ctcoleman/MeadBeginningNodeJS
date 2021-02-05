import express from 'express'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'
import './db/mongoose.js'

const app = express()
const port = process.env.PORT || 3000

// use express methods to parse incoming data to json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// use express listen method to set the port for the server to listen on
app.listen(port, () => console.log(`Server up on port ${port}`))
