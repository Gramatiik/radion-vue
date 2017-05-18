import Vue from 'vue'
import Vuex from 'vuex'
import {
  MENU_TOGGLE,
  API_FAILURE,
  LIST_LOADING,
  APP_LOADING
} from './mutation-types'
import igdbModule from './modules/igdb'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuOpened: false,
    loading: false,
    listLoading: false,
    apiFailure: false
  },
  mutations: {
    [MENU_TOGGLE] (state) {
      state.menuOpened = !state.menuOpened
    },
    [API_FAILURE] (state, value) {
      state.listLoading = !value
      state.apiFailure = !!value
    },
    [LIST_LOADING] (state, value) {
      state.listLoading = !!value
    },
    [APP_LOADING] (state, value) {
      state.loading = !!value
    }
  },
  modules: {
    igdb: igdbModule
  }
})

export default store
