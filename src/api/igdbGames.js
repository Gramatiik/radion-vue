import Vue from 'vue'
import IgdbQueryBuilder from './IgdbQueryBuilder'

export default {
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

  getGameBySlug (slug) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setFields(['*'])
      .setLimit(1)
      .setFilters([{field: 'slug', type: 'eq', value: slug}])
      .finalize())
      .then(response => response.body[0] || {})
  }
}
