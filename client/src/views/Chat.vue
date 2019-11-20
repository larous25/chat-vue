<template>
  <div>
    <router-link to="/">Back</router-link>
    <div class="rooms">
      <Messages />
      <input type="text" name="newRoom" placeholder="Name new room">
      <button id="room">Create room</button>
      <Rooms :main="$route.params.user" />
      <NewMessage @sendMessage="send" />
    </div>

  </div>
</template>
<script>
import Messages from '@/components/Messages.vue'
import NewMessage from '@/components/NewMessage.vue'
import Rooms from '@/components/Rooms.vue'
export default {
  name: 'chat',
  data: function () {
    return {
      rooms: []
    }
  },
  components: {
    Messages,
    NewMessage,
    Rooms
  },
  sockets: {
    newroom (newroom) {
      this.rooms.push(newroom)
    },
    message (data) {

    }
  },
  methods: {
    send () {

    }
  }
}
</script>
