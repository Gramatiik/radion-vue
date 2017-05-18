import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Games from '@/components/Games/Games'
import GameDetails from '@/components/Games/GameDetails'
import Pulses from '@/components/Pulses/Pulses'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Games',
        params: {
          ordering: 'popular'
        }
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/games',
      redirect: {
        name: 'Games'
      }
    },
    {
      path: '/games/:ordering',
      name: 'Games',
      component: Games,
      props: true
    },
    {
      path: '/games/:slug',
      name: 'GameDetails',
      component: GameDetails,
      props: true
    },
    {
      path: '/pulses',
      name: 'Pulses',
      component: Pulses
    }
  ]
})
