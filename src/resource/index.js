import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('X-Mashape-Key', 'WzszVUD356mshzOSd3HjsqmiMCU9p1hSudxjsnubz4RaLKB7AH')
  next()
})
