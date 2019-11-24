<template>
    <div class="allrooms">
        <span class="msg active">Actual: {{main.name}}</span>
        <hr>
        <span>Salas: </span>
        <b-list-group>
        <b-list-group-item v-for="(item, index) in rooms" :key="index" @click="changeRoom(item)">
          {{ item.name }}
        </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
  name: 'room',
  props: ['main', 'rooms'],
  methods: {
    changeRoom (item) {
      this.$emit('change', item)
    }
  }
}
</script>
