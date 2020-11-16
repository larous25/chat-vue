
const express = require('express')
const app = express()

// middlewares tipicos
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json({ limit: '1mb' }))
app.use(cors())

// para cargar el build de vue
const { resolve } = require('path')
const publicPath = resolve(__dirname, './client/dist/')
const staticConf = { maxAge: '1y', etag: false }
const staticFileMiddleware = express.static(publicPath, staticConf)
app.use(staticFileMiddleware)
const history = require('connect-history-api-fallback')
app.use('/', history({
  index: resolve(__dirname, './client/dist/index.html')
}))

//
app.use(function errorHandler (err, req, res, next) {
  console.error('este es de la aplicacion Express', err)
  res.status(err.statusCode || 400).json({
    message: err.message
  })
})

// si no encuentra la url 404
app.use(function noFoundHandler (req, res) {
  res.status(404)
  const msn = 'Not found'

  if (req.accepts('json')) {
    return res.json({ error: msn })
  }

  res.send(msn)
})

// corriendo el server como tal
const port = 5000
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
const io = require('socket.io')
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
