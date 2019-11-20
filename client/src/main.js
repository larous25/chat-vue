import Vue from 'vue'
import App from './App.vue'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'

const connection = socketio('http://localhost:5000')

Vue.use(new VueSocketIo({
  connection,
  debug: true
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
