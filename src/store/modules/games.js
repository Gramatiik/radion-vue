import gamesAPI from '../../api/igdbGames'
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
  getGames ({ commit }) {
    commit(APP_LOADING)

    gamesAPI.getGames()
      .then(function (response) {
        console.log(response)
        commit(RECIEVE_GAMES, response.body)
      })
      .catch(function () {
        console.log('Error fetching games from API...')
      })
      .then(function () {
        commit(APP_LOADING_FINISHED)
      })
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
