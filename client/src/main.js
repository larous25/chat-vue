import Vue from 'vue'
import App from './App.vue'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const connection = socketio('http://localhost:5000/chat', {
  query: {
    auth: 'dejame pasar porfa'
  }
})

Vue.use(BootstrapVue)
Vue.use(new VueSocketIo({
  connection,
  debug: true
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
