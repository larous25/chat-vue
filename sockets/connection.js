
const dRoom = 'defaultRoom'
const eventNRooms = 'newrooms'
const newMsg = 'newmessage'

module.exports = nsp => {
  return skClient => {
    // say my name
    // esto es lo basico
    skClient.on('setMyName', name => {
      skClient.myName = name
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
          .map(c => nsp.connected[c].myName)
        skClient.emit(eventNRooms, clientsNames)
      })
    })

    // evento del cuarto nuevo
    skClient.on(eventNRooms, data => {
      skClient.join(data)
      skClient.emit(eventNRooms, [data])
    })

    // evento del mensaje
    skClient.on(newMsg, data => {
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
    skClient.on('changeRoom', data => {
      if (data === dRoom) {
        skClient.mainRoom = data
        skClient.aliasRoom = data
        return
      }

      // creamos el cuarto, una combinacion de ambos cuartos
      // para que sea un chat privado
      const newRoom = [skClient.myName, data]
        .sort((a, b) => {
          return a.localeCompare(b)
        })
        .map(r => r.substring(0, 4))
        .join('-')

      // si no existe el cuarto
      if (!Object.keys(skClient.rooms).some(r => r === newRoom)) {
        console.log('nombre del cuarto nuevo: ', newRoom)
        // buscamos el cliente para unirlo al cuarto
        nsp.in(dRoom).clients(function joinClient (error, clients) {
          if (error) { throw error }

          for (const c of clients) {
            if (c === skClient.id) { continue }
            if (nsp.connected[c].myName === data) {
              nsp.connected[c].join(newRoom)
              skClient.join(newRoom)
              break
            }
          }
        })
      }

      skClient.mainRoom = newRoom
      skClient.aliasRoom = skClient.myName
    })
  }
}
