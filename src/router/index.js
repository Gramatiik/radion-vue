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
      component: Games,
      props: { ordering: 'popular' }
    },
    {
      path: '/games/popular',
      name: 'Games',
      component: Games,
      props: { ordering: 'popular' }
    },
    {
      path: '/games/recent',
      name: 'Games',
      component: Games,
      props: { ordering: 'recent' }
    },
    {
      path: '/games/:slug',
      name: 'GameDetails',
      component: GameDetails,
      props: true
    }
  ]
})
