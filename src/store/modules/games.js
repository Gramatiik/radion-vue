import Vue from 'vue'
import {
  APP_LOADING,
  APP_LOADING_FINISHED,
  RECIEVE_GAMES
} from '../mutation-types'

const state = {
  games: []
}

const getters = {
  recentGames: state => state.games
}

const actions = {
  getGames ({ commit, state }) {
    commit(APP_LOADING)
    setTimeout(function () {
      Vue.http.get('https://jsonplaceholder.typicode.com/users').then(function (response) {
        commit(RECIEVE_GAMES, response.body)
        commit(APP_LOADING_FINISHED)
      })
        .catch(function () {
          console.log('Error fetching games from API...')
          commit(APP_LOADING_FINISHED)
        })
    }, 500)
  }
}

const mutations = {
  [RECIEVE_GAMES] (state, games) {
    state.games = games
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
