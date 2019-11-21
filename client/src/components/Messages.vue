<template>
    <div  class="main-messages">
        <div v-for="message in messages" :key="message.id" class="message">
            {{ message.text }}
        </div>
    </div>
</template>
<script>
export default {
  name: 'messages',
  props: ['messages']
}
</script>

<style lang="scss" scoped>
</style>
