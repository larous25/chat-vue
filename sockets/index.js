
module.exports = serverIo => {
  const socketsNsp = serverIo.of('chat')
  socketsNsp.use((sk, next) => {
    const { auth } = sk.handshake.query
    if (auth === 'dejame pasar porfa') {
      return next()
    }

    return next(new Error('authentication error'))
  })

  const onConnection = require('./connection')
  socketsNsp.on('connection', onConnection(socketsNsp))

  serverIo.on('error', () => {
    console.log('tengo un error en algun socket =S')
  })
}
