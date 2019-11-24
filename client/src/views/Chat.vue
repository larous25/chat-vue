<template>
  <b-container fluid>
    <b-row>
       <router-link to="/">Back</router-link>
    </b-row>
    <b-row>
      <b-col col lg="8">
        <Messages :messages="mainRoom.messages" />
      </b-col>
      <b-col col lg="3">
        <b-form-input id="login" name="login" v-model="newOne" placeholder="Nueva Sala">
        </b-form-input>
        <div class="mt-2">
          <b-button squared id="room" @click="newRoom(newOne)">
            Crear sala
          </b-button>
        </div>
        <Rooms :main="mainRoom" :rooms="rooms" @change="change"/>
      </b-col>
      <NewMessage @newNessage="send" />
    </b-row>
  </b-container>
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
  this.messages = []
}
Room.prototype.setName = function (name) {
  this.name = name
}
</script>
