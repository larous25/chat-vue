<template>
  <div>
    <router-link to="/">Back</router-link>
    <div class="rooms">
      <Messages />
      <input type="text" name="newRoom" placeholder="Name new room">
      <button id="room">Create room</button>
      <Rooms :main="$route.params.room" />
      <NewMessage/>
    </div>

  </div>
</template>
<script>
import Messages from '@/components/Messages.vue'
import NewMessage from '@/components/NewMessage.vue'
import Rooms from '@/components/Rooms.vue'
export default {
  name: 'chat',
  components: {
    Messages,
    NewMessage,
    Rooms
  }
}
</script>
