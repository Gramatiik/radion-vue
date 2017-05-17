import Vue from 'vue'
import IgdbQueryBuilder from './IgdbQueryBuilder'

export default {
  /**
   * Get a game list and order it by 'orderingField'
   * @param orderingField
   * @param offset
   */
  getGamesList (orderingField, offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setFields(['id', 'name', 'slug', 'cover', 'popularity', 'created_at', 'first_release_date'])
      .setLimit(40)
      .setOffset(offset || 0)
      .setOrder({field: orderingField, type: 'desc'})
      .setFilters([{field: 'first_release_date', type: 'lte', value: Date.now()}])
      .finalize())
      .then(response => response.body || [])
  },

  /**
   * Get a game details by its slug
   * @param slug
   */
  getGameBySlug (slug) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setFields(['*'])
      .setLimit(1)
      .setFilters([{field: 'slug', type: 'eq', value: slug}])
      .finalize())
      .then(response => response.body[0] || {})
  },

  /**
   * Get the latest pulse news
   * @param offset
   */
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
