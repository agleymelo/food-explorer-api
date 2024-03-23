require('express-async-errors')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const AppError = require('./utils/app-error')
const routes = require('./routes/index.routes')
const { UPLOADS_FOLDER } = require('./configs/upload')

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())
app.use('/files', express.static(UPLOADS_FOLDER))
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  console.log(error)

  return response.status(500).json({ status: 'error', message: 'Server Internal Error' })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`🔥 Server running at port ${PORT}`))
