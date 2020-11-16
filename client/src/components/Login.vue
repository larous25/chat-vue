<template>
    <b-form @submit.prevent="submit">
      <b-input-group prepend="Ingreso" class="mt-3">
        <b-form-input id="login" name="login" v-model="user" :state="validText" placeholder="Pon tu alias">
        </b-form-input>
        <b-input-group-append>
          <b-button type="submit" variant="outline-primary">Ingresar</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-if="error">
        {{error}}
      </div>
   </b-form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: '',
      error: ''
    }
  },
  methods: {
    submit () {
      if (/(?=.{5})(?=.*[a-z])(?=.*[A-Z])/.test(this.user)) {
        this.$emit('sendUserName', this.user)
        return
      }

      this.error = 'Deben ser por lo menos cinco letras y solo se permite minusculas y mayusculas (por lo menos una de cada una)'
    }
  },
  computed: {
    validText () {
      return /(?=.{5})(?=.*[a-z])(?=.*[A-Z])/.test(this.user)
    }
  }
}
</script>
