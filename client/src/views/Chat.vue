<template>
  <div>
    <router-link to="/">Back</router-link>
    <div class="rooms">
      <Messages :messages="mainRoom.messages" />
      <input type="text" name="newOne" placeholder="Nueva Sala" v-model="newOne">
      <button id="room" @click="newRoom(newOne)">Crear sala</button>
      <Rooms :main="mainRoom" :rooms="rooms" @change="change"/>
      <NewMessage @newNessage="send" />
    </div>

  </div>
</template>
<script>
import Messages from '@/components/Messages.vue'
import NewMessage from '@/components/NewMessage.vue'
import Rooms from '@/components/Rooms.vue'
// $route.params.user
export default {
  name: 'chat',
  data: function () {
    let one = new Room()
    one.setName('one')
    let two = new Room()
    two.setName('two')
    let mainRoom = new Room()
    mainRoom.setName('default')
    return {
      rooms: [one, two],
      mainRoom,
      newOne: ''
    }
  },
  components: {
    Messages,
    NewMessage,
    Rooms
  },
  sockets: {
    newroom (newroom) {

    },
    message (data) {

    }
  },
  methods: {
    send (message) {
      this.mainRoom.messages.push(message)
    },
    change (room) {
      this.mainRoom = room
    },
    newRoom (newroom) {
      let r = new Room()
      r.setName(newroom)
      this.rooms.push(r)
    }
  }
}

function Room () {
  this.name = ''
  this.messages = [{
    text: 'eee',
    id: 0
  }]
}
Room.prototype.setName = function (name) {
  this.name = name
}
</script>
