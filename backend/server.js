import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import testRouter from './routes/forTest2.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(testRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})