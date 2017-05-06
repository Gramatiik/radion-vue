import Vue from 'vue'
import Vuex from 'vuex'
import {
  MENU_TOGGLE,
  LIST_LOADING,
  LIST_LOADING_FINISHED,
  APP_LOADING,
  APP_LOADING_FINISHED
} from './mutation-types'
import gamesModule from './modules/games'
import pulsesModule from './modules/pulses'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuOpened: false,
    loading: false,
    listLoading: false
  },
  mutations: {
    [MENU_TOGGLE] (state) {
      state.menuOpened = !state.menuOpened
    },
    [LIST_LOADING] (state) {
      state.listLoading = true
    },
    [LIST_LOADING_FINISHED] (state) {
      state.listLoading = false
    },
    [APP_LOADING] (state) {
      state.loading = true
    },
    [APP_LOADING_FINISHED] (state) {
      state.loading = false
    }
  },
  modules: {
    gamesModule: gamesModule,
    pulsesModule: pulsesModule
  }
})

export default store
