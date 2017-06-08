import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from '@/components/AboutPage'
import HomePage from '@/components/HomePage'
import SettingsPage from '@/components/SettingsPage'
import PlatformsPage from '@/components/Platforms/PlatformsPage'
import GamesPage from '@/components/Games/GamesPage'
import GameDetailsPage from '@/components/Games/GameDetailsPage'
import DiscoverPage from '@/components/Discover/DiscoverPage'
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

    /*
     * Redirect to homepage if by default
     */
    {
      path: '/',
      redirect: {
        name: 'Home'
      }
    },

    /*
     * Home page
     */
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },

    /*
     * Games default route
     */
    {
      path: '/games',
      name: 'GamesDefault',
      redirect: {
        name: 'Games',
        params: { ordering: 'popular' }
      }
    },

    /*
     * Games page with ordering selection
     */
    {
      path: '/games/:ordering',
      name: 'Games',
      component: GamesPage,
      props: true
    },

    /*
     * Games Search page
     */
    {
      path: '/games/search/:query',
      name: 'GamesSearch',
      component: GamesPage,
      props: true
    },

    /*
     * Games Details page
     */
    {
      path: '/games/details/:slug',
      name: 'GameDetails',
      component: GameDetailsPage,
      props: true
    },

    /*
     * Pulses page
     */
    {
      path: '/pulses',
      name: 'Pulses',
      component: PulsesPage
    },

    /*
     * Platforms page
     */
    {
      path: '/platforms',
      name: 'Platforms',
      component: PlatformsPage
    },

    /*
     * Discover page
     */
    {
      path: '/discover',
      name: 'Discover',
      component: DiscoverPage
    },

    /*
     * Settings page
     */
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    },

    /*
     * About page
     */
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },

    /*
     * If route did not matched, redirect to 404 component
     */
    {
      path: '*',
      name: 'NotFound',
      component: Error404Page
    }
  ]
})
