import Vue from 'vue'
import IgdbQueryBuilder from './IgdbQueryBuilder'

export default {
  getLatestPulses (offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('pulses')
      .setFields(['id', 'title', 'image', 'url', 'published_at'])
      .setLimit(25)
      .setOrder({field: 'published_at', type: 'desc'})
      .setFilters([{field: 'published_at', type: 'lte', value: Date.now()}])
      .setOffset(offset || 0)
      .finalize())
      .then(response => response.body || [])
  }
}
