import Vue from 'vue'
import Vuex from 'vuex'
import {
  MENU_TOGGLE,
  APP_LOADING,
  APP_LOADING_FINISHED
} from './mutation-types'
import games from './modules/games'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuOpened: false,
    loading: false
  },
  mutations: {
    [MENU_TOGGLE] (state) {
      state.menuOpened = !state.menuOpened
    },
    [APP_LOADING] (state) {
      state.loading = true
    },
    [APP_LOADING_FINISHED] (state) {
      state.loading = false
    }
  },
  modules: {
    games: games
  }
})

export default store
