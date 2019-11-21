<template>
    <div class="allrooms">
        <span class="msg active">{{main.name}}</span>
        <hr>
        <div v-for="(item, index) in rooms" :key="index" @click="changeRoom(item)">
          {{ item.name }}
        </div>
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
