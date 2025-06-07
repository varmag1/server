import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js'

connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})