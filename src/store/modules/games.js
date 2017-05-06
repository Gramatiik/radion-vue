import gamesAPI from '../../api/igdbGames'
import {
  APP_LOADING,
  APP_LOADING_FINISHED,
  RECIEVE_GAMES,
  RECIEVE_GAME_DETAILS
} from '../mutation-types'

const state = {
  games: [],
  gameDetails: {}
}

const getters = {
  gamesCount: function ({state}) {
    return state.games.length
  }
}

const actions = {
  getGamesList ({ commit }, offset) {
    commit(APP_LOADING)

    gamesAPI.getGamesList(offset)
      .then(function (data) {
        commit(RECIEVE_GAMES, data)
      })
      .catch(function () {
        console.log('Error fetching games from API...')
      })
      .then(function () {
        commit(APP_LOADING_FINISHED)
      })
  },

  getGameBySlug ({ commit }, slug) {
    commit(APP_LOADING)

    gamesAPI.getGameBySlug(slug)
      .then(function (data) {
        commit(RECIEVE_GAME_DETAILS, data)
      })
      .catch(function () {
        console.log('Unable to retrieve game details...')
      })
      .then(function () {
        commit(APP_LOADING_FINISHED)
      })
  }
}

const mutations = {
  [RECIEVE_GAMES] (state, games) {
    state.games = games
  },
  [RECIEVE_GAME_DETAILS] (state, gameDetails) {
    state.gameDetails = gameDetails
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
