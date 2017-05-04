import Vue from 'vue'
import IgdbQueryBuilder from './igdbBase'

export default {
  getGames () {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder.init()
      .setEndpoint('games')
      .setFields(['*'])
      .setLimit(40)
      .finalize())
  }
}
