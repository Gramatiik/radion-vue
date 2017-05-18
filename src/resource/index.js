import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push(function (request, next) {
  // timeout is set to 8 seconds
  request.timeout = 8 * 1000
  // we add globally the IGDB api key here
  request.headers.set('X-Mashape-Key', 'WzszVUD356mshzOSd3HjsqmiMCU9p1hSudxjsnubz4RaLKB7AH')
  next()
})
