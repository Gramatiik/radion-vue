import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Games from '@/components/Games'
import GameDetails from '@/components/GameDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/games/:id',
      name: 'GameDetails',
      component: GameDetails
    }
  ]
})
