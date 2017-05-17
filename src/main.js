// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMoment from 'vue-moment'
import VueInfiniteScroll from 'vue-infinite-scroll'
import VueLazyBackgroundImage from 'vue-lazy-background-images/VueLazyBackgroundImage.vue'
import {} from './resource'
import {} from './filters'
import router from './router'
import store from './store'
import initState from './store/init'

Vue.use(VueMoment)
Vue.use(VueInfiniteScroll)
Vue.component('lazy-background', VueLazyBackgroundImage)

Vue.config.productionTip = false

initState(store)
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  })

