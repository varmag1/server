import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js'
import router from './src/routes/user.route.js'

connectDB()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})