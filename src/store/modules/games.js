import gamesAPI from '../../api/igdbGames'
import {
  LIST_LOADING,
  LIST_LOADING_FINISHED,
  APP_LOADING,
  APP_LOADING_FINISHED,
  CLEAR_GAMES,
  RECIEVE_GAMES,
  RECIEVE_GAME_DETAILS
} from '../mutation-types'

const state = {
  games: [],
  gameDetails: {}
}

const getters = {
  gamesCount: function (state) {
    return state.games.length
  }
}

const actions = {

  /**
   * Loads a list of games ordered by release dates or popularity
   * and appends results it to the current loaded games
   * @param commit
   * @param orderingField type of ordering wanted
   * @param offset offset from first item
   */
  getGamesList ({ commit }, data) {
    let orderingField = data.orderingField === 'recent' ? 'first_release_date' : 'popularity'

    commit(LIST_LOADING)

    gamesAPI.getGamesList(orderingField, data.offset)
      .then(function (data) {
        commit(RECIEVE_GAMES, data)
      })
      .catch(function () {
        console.log('Error fetching games from API...')
      })
      .then(function () {
        commit(LIST_LOADING_FINISHED)
      })
  },

  /**
   * Grabs games details based on the slug of the game
   * @param commit
   * @param slug
   */
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
  /**
   * Save recieved games
   * @param state
   * @param games
   */
  [RECIEVE_GAMES] (state, games) {
    state.games = state.games.concat(games)
  },

  /**
   * Clears currently loaded games
   * @param state
   */
  [CLEAR_GAMES] (state) {
    state.games = []
  },

  /**
   * Save recieved Game Details
   * @param state
   * @param gameDetails
   */
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
