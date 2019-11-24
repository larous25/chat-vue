<template>
    <div  class="main-messages">
        <b-media v-for="message in messages" :key="message.id" right-align vertical-align="center" style="margin-top:10px">
            <h6 class="mt-0 mb-1">{{message.user}}</h6>
            <p class="mb-0">
                {{ message.text }}
            </p>
        </b-media>
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
