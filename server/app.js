if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const router = require('./routes')
const errorHandler = require('./middlewares/error_handler')

const PORT = process.env.PORT || 3000
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

let clientSocket

io.on('connection', (socket) => {
  socket.on('update_arisan', function () {
    socket.broadcast.emit('update_arisan')
  })
})

app.use(cors())
// json raw
app.use(express.json())
// body urlencoded
app.use(express.urlencoded({ extended: true }))

// routes
app.use(router)
app.use(errorHandler)

server.listen(PORT, _ => {
  console.log(`Server is running on ${PORT}`)
})