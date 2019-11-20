<template>
  <div class="home">
    <div v-if="isConnected">
      Se ha conectado con exito!
    </div>
    <Login @sendUserName="send"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  data: function () {
    return {
      isConneted: false
    }
  },
  components: {
    Login
  },
  methods: {
    send (usuario) {
      this.$router.push(`/chat/${usuario}`)
    }
  },
  sockets: {
    connect () {
      this.isConneted = true
    },
    disconnect () {
      this.isConneted = false
    }
  }
}
</script>
