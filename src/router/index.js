import Vue from 'vue'
import Router from 'vue-router'
import AboutPage from '@/components/AboutPage'
import SettingsPage from '@/components/SettingsPage'
import GamesPage from '@/components/Games/GamesPage'
import GameDetailsPage from '@/components/Games/GameDetailsPage'
import PulsesPage from '@/components/Pulses/PulsesPage'
import Error404Page from '@/components/errors/Error404Page'

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
      component: AboutPage
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    },
    {
      path: '/games',
      name: 'GamesDefault',
      redirect: {
        name: 'Games',
        params: { ordering: 'popular' }
      }
    },
    {
      path: '/games/:ordering',
      name: 'Games',
      component: GamesPage,
      props: true
    },
    {
      path: '/games/search/:query',
      name: 'GamesSearch',
      component: GamesPage,
      props: true
    },
    {
      path: '/games/details/:slug',
      name: 'GameDetails',
      component: GameDetailsPage,
      props: true
    },
    {
      path: '/pulses',
      name: 'Pulses',
      component: PulsesPage
    },
    {
      path: '*',
      name: 'NotFound',
      component: Error404Page
    }
  ]
})
