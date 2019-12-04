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
        <b-form-input id="login" name="login" v-model="newOne" :state="newOne.length !== 0 " placeholder="Nueva Sala">
        </b-form-input>
        <div class="mt-2">
          <b-button squared id="room" @click="newRoom(newOne)">
            Crear sala
          </b-button>
        </div>
        <Rooms :main="mainRoom" :rooms="rooms" @change="changeRoom"/>
      </b-col>
      <NewMessage :user="$route.params.user" @newNessage="sendMessage" />
    </b-row>
  </b-container>
</template>
<script>
import Messages from '@/components/Messages.vue'
import NewMessage from '@/components/NewMessage.vue'
import Rooms from '@/components/Rooms.vue'
import Room from '@/helpers/Room'

export default {
  name: 'chat',
  beforeCreate () {
    this.$socket.emit('setMyName', this.$route.params.user)
  },
  data: function () {
    return {
      rooms: [],
      mainRoom: {},
      newOne: ''
    }
  },
  components: {
    Messages,
    NewMessage,
    Rooms
  },
  sockets: {
    setMain (room) {
      const r = new Room()
      r.setName(room)
      this.mainRoom = r
      this.rooms.push(r)
    },
    newrooms (rooms) {
      rooms = rooms.map(r => {
        const nR = new Room()
        nR.setName(r)
        return nR
      })
      this.rooms.push(...rooms)
    },
    newmessage ([m, rn]) {
      this.rooms.forEach(r => {
        // aqui debe estar el alias y no el nombre
        if (r.getName() === rn) {
          r.messages.push(m)
        }
      })
    },
    message (ns) {
    }
  },
  methods: {
    sendMessage (message) {
      this.$socket.emit('newmessage', message)
      this.mainRoom.messages.push(message)
    },
    changeRoom (room) {
      this.$socket.emit('changeRoom', room.getName())
      this.mainRoom = room
    },
    newRoom (newroom) {
      if (newroom.length === 0) {
        return
      }
      this.$socket.emit('newroom', newroom)
    }
  }
}
</script>
