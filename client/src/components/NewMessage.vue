<template>
  <b-container style="margin-top:10px">
      <b-row>
          <b-col sm="10">
            <b-form-textarea id="new-message" name="new-message" rows="5" cols="40" :state="text.length >= 10" placeholder="¡Escribe algo nuevo!" v-model="text">
            </b-form-textarea>
          </b-col>
          <b-col sm="2">
            <b-button id="send" @click="send">Enviar</b-button>
          </b-col>
      </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'newmessage',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    send () {
      this.$emit('newNessage', new Message(this.text))
    }
  }
}
let i = 0
function Message (msn) {
  this.user = 'user'
  this.text = msn
  i++
  this.id = i
}
</script>
