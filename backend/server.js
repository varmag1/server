import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js'

import adminRouter from './src/routes/admin.route.js'
import userRouter from './src/routes/user.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
    connectDB()
})  