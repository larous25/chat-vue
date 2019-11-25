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
      if (this.user.length > 5) {
        this.$emit('sendUserName', this.user)
        return
      }

      this.error = 'El usuario debe tener minimo 5 caracteres'
    }
  },
  computed: {
    validText () {
      return this.user.length > 5
    }
  }
}
</script>
