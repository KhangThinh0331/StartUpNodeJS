require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const port = 3000
const routes = require('./routes')
const db = require('./config/db')

db.connect()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)

app.listen(port)