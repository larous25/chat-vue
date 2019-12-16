<template>
  <b-container style="margin-top:10px">
    <b-row>
      <b-col sm="10">
        <b-form-textarea id="new-message" name="new-message" rows="5" cols="40" :state="text.length >= 1" placeholder="¡Escribe algo nuevo!" v-model="text">
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
  props: ['user'],
  data () {
    return {
      text: ''
    }
  },
  methods: {
    send () {
      if (this.text.length <= 1) { return }

      this.$emit('newNessage', {
        user: this.user,
        text: this.text
      })
      this.text = ''
    }
  }
}
</script>
