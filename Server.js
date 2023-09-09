const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/eventRoute')
require('dotenv').config()




const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

app.use(routes)

app.listen(PORT, () => console.log('listening on port 5000'))