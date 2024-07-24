import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoUrl = process.env.MONGO_URI


// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(bodyParser.json())

// Routes
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

// Connect to MongoDB and start server
mongoose
  .connect(mongoUrl!)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})