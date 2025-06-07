import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js'

connectDB()

import adminRoutes from './src/routes/admin.route.js'
import userRoutes from './src/routes/user.route.js'

import adminRoutes from './src/routes/admin.route.js'
import userRoutes from './src/routes/user.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/api/admin', adminRoutes);
app.get('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})  