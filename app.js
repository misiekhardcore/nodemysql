import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/posts.js'

dotenv.config()

const app = express();
const postRouter = router

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/posts', postRouter)

//Server listener
app.listen(process.env.PORT, _=>{
  console.log('Server started at:',process.env.PORT)
})