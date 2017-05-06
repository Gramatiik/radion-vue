import pulsesAPI from '../../api/igdbPulses'
import {
  LIST_LOADING,
  LIST_LOADING_FINISHED,
  RECIEVE_PULSES,
  CLEAR_PULSES
} from '../mutation-types'

const state = {
  pulses: []
}

const getters = {
  pulsesCount: function (state) {
    return state.pulses.length
  }
}

const actions = {

  getLatestPulses ({ commit }, offset) {
    commit(LIST_LOADING)

    pulsesAPI.getLatestPulses(offset)
      .then(function (data) {
        commit(RECIEVE_PULSES, data)
      })
      .catch(function () {
        console.log('Error fetching pulses from API...')
      })
      .then(function () {
        commit(LIST_LOADING_FINISHED)
      })
  }
}

const mutations = {
  /**
   * Save recieved games
   * @param state
   * @param games
   */
  [RECIEVE_PULSES] (state, games) {
    state.games = state.games.concat(games)
  },

  /**
   * Clears currently loaded games
   * @param state
   */
  [CLEAR_PULSES] (state) {
    state.games = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
