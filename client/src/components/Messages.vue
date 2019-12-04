<template>
    <div  class="main-messages">
        <b-media v-for="message in messages" :key="message.id" class="message">
            <h6 class="mt-0 mb-1"> <strong>{{message.user}}</strong>:</h6>
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

<style scoped>
.main-messages {
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
    padding: 10px;
}
.message {
    margin-bottom: 10px;
    background: white;
}
</style>
