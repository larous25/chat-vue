<template>
  <div class="hello">
    <b-input-group prepend="Ingreso" class="mt-3">
      <b-form-input id="login" name="login" v-model="usuario" placeholder="Pon tu alias"></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-primary" @click="ingresar">Ingresar</b-button>
      </b-input-group-append>
    </b-input-group>

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
