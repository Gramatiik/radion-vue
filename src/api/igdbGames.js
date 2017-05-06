import Vue from 'vue'
import IgdbQueryBuilder from './igdbBase'

function extractData (response) {
  return response.body || []
}

export default {
  getLatestGames (offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setFields(['id', 'name', 'slug', 'cover'])
      .setLimit(40)
      .setOffset(offset || 0)
      .finalize())
      .then(response => extractData(response))
  },

  getGameBySlug (slug) {
    let builder = new IgdbQueryBuilder()

    return Vue.resource.get(builder
      .setFields(['*'])
      .setLimit(1)
      .setFilters([{field: 'slug', type: 'eq', value: slug}]))
      .then(response => extractData(response))
  }
}
