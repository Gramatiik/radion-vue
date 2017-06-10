import Vue from 'vue'
import igdbApi from '../../api/igdb'
import {
  LIST_LOADING,
  APP_LOADING,
  API_FAILURE,

  RECIEVE_GAMES,
  RECIEVE_GAME_DETAILS,
  CLEAR_GAMES,

  ADD_FAVOURITE_GAME,
  ADD_FAVOURITE_GAME_ALL,
  REMOVE_FAVOURITE_GAME,

  RECIEVE_PULSE_SOURCES_LIST,
  RECIEVE_PULSES,
  CLEAR_PULSES,

  RECIEVE_PLATFORMS,
  CLEAR_PLATFORMS,

  RECIEVE_PLATFORMS_LIST,
  RECIEVE_GENRES_LIST
} from '../mutation-types'

const state = {
  games: [],
  favouriteGames: {},
  gameDetails: {},

  pulses: [],
  pulseSourcesList: [],

  platforms: [],
  platformsList: [],

  pulseGenresList: []
}

const getters = {
  gamesCount (state) {
    return state.games.length
  },

  pulsesCount (state) {
    return state.pulses.length
  },

  platformsCount (state) {
    return state.platforms.length
  },

  platformsTotalCount (state) {
    return state.platformsList.filter(val => { if (val) return val }).length
  }
}

const actions = {

  /**
   * Loads a list of games ordered by release dates or popularity
   * and appends results it to the current loaded games
   * @param commit
   * @param data orderingField (can be 'recent', 'popular' or 'best-rated' and offset
   */
  getGamesList ({ commit }, data) {
    let orderingField
    switch (data.orderingField) {
      case 'recent':
        orderingField = 'first_release_date'
        break

      case 'top-rated':
        orderingField = 'rating'
        break

      case 'popular':
        orderingField = 'popularity'
        break

      default:
        throw new Error('Ordering field is invalid')
    }

    commit(LIST_LOADING, true)

    return igdbApi.getGamesList(orderingField, data.offset)
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
   * Loads a list of games matching the given query
   * @param commit
   * @param query
   */
  searchForGames ({ commit }, query) {
    commit(LIST_LOADING, true)

    return igdbApi.searchForGames(query)
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

    return igdbApi.getGameBySlug(slug)
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
   * Get platforms in alphabetical order
   * @param commit
   * @param offset
   */
  getPlatforms ({ commit }, offset) {
    commit(LIST_LOADING, true)

    return igdbApi.getPlatforms(offset)
      .then(function (data) {
        commit(RECIEVE_PLATFORMS, data)
      })
      .catch(function () {
        console.log('Error fetching plaforms from API...')
        commit(API_FAILURE, true)
      })
      .then(function () {
        commit(LIST_LOADING, false)
      })
  },

  /**
   * Get the latest pulses news
   * @param commit
   * @param offset
   */
  getLatestPulses ({ commit }, offset) {
    commit(LIST_LOADING, true)

    return igdbApi.getLatestPulses(offset)
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
   * Add new game to favourites
   * @param state
   * @param game
   */
  [ADD_FAVOURITE_GAME] (state, game) {
    Vue.set(state.favouriteGames, game.name, game)

    try {
      localStorage.setItem('favouriteGames', JSON.stringify(state.favouriteGames))
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * Add multiple games to favourites
   * @param state
   * @param games
   */
  [ADD_FAVOURITE_GAME_ALL] (state, games) {
    for (let gameName in games) {
      if (games.hasOwnProperty(gameName)) {
        state.favouriteGames[gameName] = games[gameName]
        Vue.set(state.favouriteGames, gameName, games[gameName])
      }
    }

    try {
      localStorage.setItem('favouriteGames', JSON.stringify(state.favouriteGames))
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * Remove game from favourites
   * @param state
   * @param game
   */
  [REMOVE_FAVOURITE_GAME] (state, game) {
    if (state.favouriteGames[game.name]) {
      Vue.delete(state.favouriteGames, game.name)
    }

    try {
      localStorage.setItem('favouriteGames', JSON.stringify(state.favouriteGames))
    } catch (e) {
      console.log(e)
    }
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
  },

  /**
   * Save recieved platforms list to current state
   * @param state
   * @param list
   */
  [RECIEVE_PLATFORMS_LIST] (state, list) {
    state.platformsList = list
  },

  /**
   * Save recieved platforms list to current state
   * @param state
   * @param list
   */
  [RECIEVE_PLATFORMS] (state, platforms) {
    state.apiFailure = false
    state.platforms = state.platforms.concat(platforms)
  },

  /**
   * Clears currently loaded pulses
   * @param state
   */
  [CLEAR_PLATFORMS] (state) {
    state.platforms = []
  },

  /**
   * Save recieved pulses sources list to current state
   * @param state
   * @param list
   */
  [RECIEVE_PULSE_SOURCES_LIST] (state, list) {
    state.pulseSourcesList = list
  },

  /**
   * Save recieved genres list to current state
   * @param state
   * @param list
   */
  [RECIEVE_GENRES_LIST] (state, list) {
    state.pulseGenresList = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
