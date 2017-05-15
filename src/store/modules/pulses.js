import pulsesAPI from '../../api/igdbPulses'
import {
  LIST_LOADING,
  API_FAILURE,
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
    commit(LIST_LOADING, true)

    pulsesAPI.getLatestPulses(offset)
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
  [RECIEVE_PULSES] (state, data) {
    state.apiFailure = false
    state.pulses = state.pulses.concat(data)
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
