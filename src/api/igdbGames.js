import Vue from 'vue'

const BASE_URL = 'https://igdbcom-internet-game-database-v1.p.mashape.com'

export default {
  getGames () {
    return Vue.http.get(BASE_URL + '/games/?fields=id,name&limit=15')
  }
}
