<template>
  <div class="home">
    <Login @sendUserName="send"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  },
  methods: {
    send (user) {
      this.$router.push(`/chat/${user}`)
    }
  }
}
</script>
