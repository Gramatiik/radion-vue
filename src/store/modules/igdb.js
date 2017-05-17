import igdbApi from '../../api/igdb'
import {
  LIST_LOADING,
  APP_LOADING,
  API_FAILURE,
  CLEAR_GAMES,
  RECIEVE_GAMES,
  RECIEVE_GAME_DETAILS,

  RECIEVE_PULSES,
  CLEAR_PULSES
} from '../mutation-types'

const state = {
  games: [],
  gameDetails: {},

  pulses: []
}

const getters = {
  gamesCount: function (state) {
    return state.games.length
  },

  pulsesCount: function (state) {
    return state.pulses.length
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

    commit(LIST_LOADING, true)

    igdbApi.getGamesList(orderingField, data.offset)
      .then(function (data) {
        commit(RECIEVE_GAMES, data)
      })
      .catch(function () {
        console.log('Error fetching games from API...')
        commit(API_FAILURE, true)
      })
      .then(function () {
        commit(LIST_LOADING, false)
      })
  },

  /**
   * Grabs games details based on the slug of the game
   * @param commit
   * @param slug
   */
  getGameBySlug ({ commit }, slug) {
    commit(APP_LOADING, true)

    igdbApi.getGameBySlug(slug)
      .then(function (data) {
        commit(RECIEVE_GAME_DETAILS, data)
      })
      .catch(function () {
        console.log('Unable to retrieve game details...')
        commit(API_FAILURE, true)
      })
      .then(function () {
        commit(APP_LOADING, false)
      })
  },

  /**
   * Get the latest pulses news
   * @param commit
   * @param offset
   */
  getLatestPulses ({ commit }, offset) {
    commit(LIST_LOADING, true)

    igdbApi.getLatestPulses(offset)
      .then(function (data) {
        commit(RECIEVE_PULSES, data)
      })
      .catch(function () {
        console.log('Error fetching pulses from API...')
        commit(API_FAILURE, true)
      })
      .then(function () {
        commit(LIST_LOADING, false)
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
    state.apiFailure = false
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
    state.apiFailure = false
    state.gameDetails = gameDetails
  },

  /**
   * Save recieved pulses
   * @param state
   * @param games
   */
  [RECIEVE_PULSES] (state, data) {
    state.apiFailure = false
    state.pulses = state.pulses.concat(data)
  },

  /**
   * Clears currently loaded pulses
   * @param state
   */
  [CLEAR_PULSES] (state) {
    state.pulses = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
