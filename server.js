'use strict'

const io = require('socket.io')

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')

app.use(bodyParser)
app.use(cors())

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('./client/dist')

// 1st call for unredirected requests
app.use(staticFileMiddleware)

// Support history api
app.use(history({
  index: '/dist/index.html'
}))

// 2nd call for redirected requests
app.use(staticFileMiddleware)

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* mini-logger */
server
  .on('listening', (req, res) => {
    console.log('-----------------------')
    console.log('server is running')
    console.log('-----------------------')
  })
  .on('connnection', (req, res) => {
    console.log('new connection')
  })
  .on('request', (req, res) => {
    console.log(`resquest to ${req.url} - ${req.method}`)
  })

/* sockets */
var serverIo = io.listen(server, { origins: '*:*' })

const socketsNsp = serverIo.of('chat')
socketsNsp.on('connection', (socket) => {
  socket.join('default')

  socket.on('newroom', (data) => {
    socket.broadcast.emit('newroom', data.newRoom)
    // socketsNsp.emit('newroom', data.newRoom);
  })

  socket.on('changeRoom', (data) => {
    socket.leave(data.before)
    socket.join(data.room)

    socket.to(data.room).broadcast.emit('message', {
      msg: `Wellcome ${socket.id.replace('/chat#', '')}`
    })
  })

  socket.on('message', (data) => {
    console.log('message', data)
    socket.to(data.room).broadcast.emit('message', data.message)
  })
})
