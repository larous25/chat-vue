'use strict'

const io = require('socket.io')

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')
var serveStatic = require('serve-static');

const { resolve } = require('path')

app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())

// Middleware for serving '/dist' directory

const publicPath = resolve(__dirname, './client/dist/')
const staticConf = { maxAge: '1y', etag: false }

const staticFileMiddleware = express.static(publicPath, staticConf)

// 1st call for unredirected requests
app.use(staticFileMiddleware)

// Support history api
app.use('/', history({
  index: resolve(__dirname, './client/dist/index.html')
}))
// app.use(serveStatic(resolve(__dirname, './client/dist')))

app.use(function errorHandler (err, req, res, next) {
  console.error('este es de la aplicacion Express', err)
  res.status(err.statusCode || 400).json({
    message: err.message
  })
})

// si no encuentra la url 404
app.use(function (req, res) {
  res.status(404)
  let msn = 'Not found'

  if (req.accepts('json')) {
    return res.json({ 'error': msn })
  }

  res.send(msn)
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* mini-logger */
server
  .on('listening', (req, res) => {
    console.log('-----------------------')
    console.log('server is running')
    console.log('-----------------------')
    console.log(`http://localhost:${port}`)
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

// por si todo falla
process
  .on('uncaughtException', err => {
    console.error('fatal error en:  ', err)
    process.exit(1)
  })
  .on('unhandledRejection', (err, p) => {
    console.error(`a ocurrido en la funcion ${p} el siguiente error: `, err.message)
    process.exit(1)
  })
