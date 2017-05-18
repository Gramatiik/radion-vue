import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Games from '@/components/Games/Games'
import GameDetails from '@/components/Games/GameDetails'
import Pulses from '@/components/Pulses/Pulses'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'PopularGames'
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
        name: 'PopularGames'
      }
    },
    {
      path: '/games/popular',
      name: 'PopularGames',
      component: Games,
      props: { ordering: 'popular' }
    },
    {
      path: '/games/recent',
      name: 'RecentGames',
      component: Games,
      props: { ordering: 'recent' }
    },
    {
      path: '/games/best-rated',
      name: 'BestRatedGames',
      component: Games,
      props: { ordering: 'rating' }
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
