'use strict'

const io = require('socket.io')

const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')

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

app.use(function errorHandler (err, req, res, next) {
  console.error('este es de la aplicacion Express', err)
  res.status(err.statusCode || 400).json({
    message: err.message
  })
})

// si no encuentra la url 404
app.use(function (req, res) {
  res.status(404)
  const msn = 'Not found'

  if (req.accepts('json')) {
    return res.json({ error: msn })
  }

  res.send(msn)
})

app.set('port', port)

const server = require('http').createServer(app).listen(port)

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
const serverIo = io.listen(server, { origins: '*:*' })
require('./sockets')(serverIo)

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
