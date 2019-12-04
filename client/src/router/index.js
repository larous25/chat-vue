import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/chat/:user',
    name: 'chat',
    component: () => import('../views/Chat.vue'),
    beforeEnter (to, from, next) {
      if (!to.params.user || to.params.user.length < 5) { return next('/') }

      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
