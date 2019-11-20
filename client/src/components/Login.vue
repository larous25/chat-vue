<template>
  <div class="hello">
    <form>
      <label for="login">Por favor escriba su nombre de usuario</label>
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" v-model="usuario">
      <button class="btn btn-sm" @click="ingresar">Ingresar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    ingresar: function () {
      this.$emit('sendUserName', this.usuario)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
