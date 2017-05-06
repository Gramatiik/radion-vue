import Vue from 'vue'
import IgdbQueryBuilder from './igdbBase'

export default {
  getLatestPulses (orderingField, offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('pulses')
      .setFields(['*'])
      .setLimit(25)
      .setOffset(offset || 0)
      .finalize())
      .then(response => response.body || [])
  }
}
