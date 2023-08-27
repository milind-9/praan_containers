const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
const device = require('./routes/device_routes')

app.use("/api/devices",device)
module.exports = app