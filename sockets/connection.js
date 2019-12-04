
const dRoom = 'defaultRoom'
const eventNRooms = 'newrooms'
const newMsg = 'newmessage'

module.exports = nsp => {
  return skClient => {
    // say my name
    // esto es lo basico
    skClient.on('setMyName', name => {
      skClient.myNick = name
      skClient.leave(skClient.id)
      skClient.join(name)
      skClient.join(dRoom)
      skClient.emit('setMain', dRoom)
      skClient.mainRoom = dRoom
      skClient.aliasRoom = dRoom

      skClient.broadcast.emit(eventNRooms, [name])
      nsp.in(dRoom).clients(function sendClients (error, clients) {
        if (error) { throw error }

        const clientsNames = clients
          .filter(c => c !== skClient.id)
          .map(c => nsp.connected[c].myNick)
        skClient.emit(eventNRooms, clientsNames)
      })
    })

    // evento del cuarto nuevo
    skClient.on(eventNRooms, data => {
      skClient.join(data)
      skClient.broadcast.emit(eventNRooms, [data])
    })

    // evento del mensaje
    skClient.on(newMsg, data => {
      console.log('\n al cuarto al que envia: ', skClient.mainRoom)
      console.log(' y el alias con el que se: ', skClient.aliasRoom)
      skClient
        .to(skClient.mainRoom)
        .broadcast
        .emit('newmessage', data, skClient.aliasRoom)
    })

    /**
     * Cuando se cambia a un cuarto que no sea el cuarto
     * por defecto tiene que buscar ese cuarto y si no existe
     * tiene que crearlo luego crear un lugar dondde guardar los mensajes
     * y finalmente unir al cuarto al usuario al que se le enviara el mensaje
     * si existe simplemente unirse a el y recuperar los mensajes
    */
    skClient.on('changeRoom', room => {
      nsp.in(dRoom).clients(function joinClient (error, clients) {
        if (error) { throw error }

        // buscamos al compañero para saber si es un chat
        // privado o de grupo
        const idPartner = clients.find(c => nsp.connected[c].myNick === room)
        let roomToChange = ''
        if (!idPartner) { // aqui es de grupo
          roomToChange = room
          skClient.aliasRoom = room

          if (!Object.keys(skClient.rooms).some(r => r === room)) {
            skClient.join(room)
          }
        } else {
          // para que sea un chat privado
          // creamos el cuarto, una combinacion de ambos nicks
          const newRoom = [skClient.myNick, room]
            .sort((a, b) => a.localeCompare(b))
            .map(r => r.substring(0, 4))
            .join('-')

          // si no existe el cuarto
          if (!Object.keys(skClient.rooms).some(r => r === newRoom)) {
            nsp.connected[idPartner].join(newRoom)
            skClient.join(newRoom)
          }

          roomToChange = newRoom
          skClient.aliasRoom = skClient.myNick
        }
        skClient.mainRoom = roomToChange
      })
    })
  }
}
