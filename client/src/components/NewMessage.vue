<template>
<div class="text">
    <textarea name="message" rows="5" cols="40" placeholder="write message" v-model="msn" >

    </textarea>
    <button id="send" @click="send">Enviar mensaje</button>
</div>
</template>
<script>
export default {
  name: 'newmessage',
  data () {
    return {
      msn: ''
    }
  },
  methods: {
    send () {
      this.$emit('newNessage', new Message(this.msn))
    }
  }
}
let i = 0
function Message (msn) {
  this.text = msn
  i++
  this.id = i
}
</script>
