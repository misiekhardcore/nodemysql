import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import postsrouter from './routes/posts.js'
import usersrouter from './routes/users.js'

dotenv.config()

const app = express();
const postRouter = postsrouter
const userRouter = usersrouter

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/posts', postRouter)
app.use('/users', userRouter)

//Server listener
app.listen(process.env.PORT, _=>{
  console.log('Server started at:',process.env.PORT)
})