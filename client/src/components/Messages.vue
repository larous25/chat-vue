<template>
    <div  class="main-messages">
        <b-media v-for="message in messages" :key="message.id" class="message" v-bind:class="{ me: message.user == $route.params.user }">
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
.message::before {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right:10px solid white;
    position: relative;
    content: "";
    left: -20px;
}
.message {
    margin-bottom: 10px;
    background: white;
    float: left;
    clear: both;
    padding: 10px;
    max-width: 80%;
    word-wrap: anywhere;
}
.me.message::before {
    border-right:10px solid transparent;
}
.me {
    float: right;
}
.me::after {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid white;
    position: relative;
    content: "";
    right: -20px;
}
</style>
