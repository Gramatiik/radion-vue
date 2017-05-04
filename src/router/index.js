import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Games from '@/components/Games'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/toto',
      name: 'Games',
      component: Games
    }
  ]
})
