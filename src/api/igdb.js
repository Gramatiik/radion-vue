import Vue from 'vue'
import IgdbQueryBuilder from './IgdbQueryBuilder'

export default {
  /**
   * Get the total number of games
   */
  getTotalGames (orderingField, offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder.setEndpoint('games/count').finalize())
      .then(response => response.body.count || 0)
  },

  /**
   * Get a game list and order it by 'orderingField'
   * @param orderingField
   * @param offset
   */
  getGamesList (orderingField, offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setFields(['id', 'name', 'slug', 'cover', 'popularity', 'created_at', 'first_release_date', 'release_dates', 'rating'])
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
   * Get a Random game, for discover page
   * @param total Number total games
   * @param excludes Array excluded ids
   */
  getRandomGame: getRandomGameReal,

  /**
   * Search for games matching query
   * @param query string
   */
  searchForGames (query) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('games')
      .setSearch(query)
      .setFields(['id', 'name', 'slug', 'cover', 'popularity', 'created_at', 'first_release_date', 'release_dates', 'rating'])
      .setLimit(50)
      .setFilters([{field: 'first_release_date', type: 'lte', value: Date.now()}])
      .finalize())
      .then(response => response.body || {})
  },

  /**
   * Get the latest pulse news
   * @param offset
   */
  getLatestPulses (offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('pulses')
      .setFields(['id', 'title', 'image', 'url', 'published_at', 'pulse_source'])
      .setLimit(25)
      .setOrder({field: 'published_at', type: 'desc'})
      .setFilters([{field: 'published_at', type: 'lte', value: Date.now()}])
      .setOffset(offset || 0)
      .finalize())
      .then(response => response.body || [])
  },

  /**
   * Returns the list of all pulse websites sources
   */
  getPulsesSourceList () {
    let builder = new IgdbQueryBuilder()
    let requests = []

    return new Promise((resolve, reject) => {
      Vue.http.get(new IgdbQueryBuilder().setEndpoint('pulse_sources/count').finalize())
        .then(response => response.body.count || 0)
        .then(count => {
          let calls = Math.ceil(count / 50)
          console.log(count)

          // perform all calls to the API
          for (let i = 0; i < calls; i++) {
            let prom = new Promise((resolve, reject) => {
              setTimeout(() => {
                Vue.http.get(builder
                  .setEndpoint('pulse_sources')
                  .setFields(['id', 'name'])
                  .setLimit(50)
                  .setOffset(i * 50)
                  .finalize())
                  .then(response => resolve(response))
                  .catch(err => reject(err))
              }, i * 120)
            })
            requests.push(prom)
          }

          Promise.all(requests)
            .then((responses) => {
              let pulseSources = []

              for (let result of responses) {
                for (let item of result.body) {
                  pulseSources[item.id] = item.name
                }
              }

              resolve(pulseSources)
            })
            .catch(err => reject(err))
        })
    })
  },

  /**
   * Returns the list of all platforms names
   */
  getPlatformsList () {
    let builder = new IgdbQueryBuilder()
    let requests = []

    return new Promise((resolve, reject) => {
    // get the count of platforms
      Vue.http.get(new IgdbQueryBuilder().setEndpoint('platforms/count').finalize())
        .then(response => response.body.count || 0)
        .then(count => {
          // calculate how many calls to get all platforms
          let calls = Math.ceil(count / 50)

          // perform all calls to the API
          for (let i = 0; i < calls; i++) {
            let prom = new Promise((resolve, reject) => {
              setTimeout(() => {
                Vue.http.get(builder
                  .setEndpoint('platforms')
                  .setFields(['id', 'name'])
                  .setLimit(50)
                  .setOffset(i * 50)
                  .finalize())
                  .then(response => resolve(response))
                  .catch(err => reject(err))
              }, i * 120)
            })
            requests.push(prom)
          }

          Promise.all(requests)
            .then((responses) => {
              let platforms = []

              for (let result of responses) {
                for (let item of result.body) {
                  platforms[item.id] = item.name
                }
              }

              resolve(platforms)
            })
            .catch(err => reject(err))
        })
    })
  },

  /**
   * Get a list of platforms starting at offset and ordered by name
   * @param offset
   */
  getPlatforms (offset) {
    let builder = new IgdbQueryBuilder()

    return Vue.http.get(builder
      .setEndpoint('platforms')
      .setFields(['id', 'name', 'games', 'logo', 'versions'])
      .setLimit(50)
      .setOffset(offset || 0)
      .setOrder({field: 'name', type: 'asc'})
      .finalize())
      .then(response => response.body || [])
  },

  /**
   * Returns the list of all genres names
   */
  getGenresList () {
    let builder = new IgdbQueryBuilder()
    let requests = []

    return new Promise((resolve, reject) => {
      // get the count of platforms
      Vue.http.get(new IgdbQueryBuilder().setEndpoint('genres/count').finalize())
        .then(response => response.body.count || 0)
        .then(count => {
          // calculate how many calls to get all platforms
          let calls = Math.ceil(count / 50)

          // perform all calls to the API
          for (let i = 0; i < calls; i++) {
            let prom = new Promise((resolve, reject) => {
              setTimeout(() => {
                Vue.http.get(builder
                  .setEndpoint('genres')
                  .setFields(['id', 'name'])
                  .setLimit(50)
                  .setOffset(i * 50)
                  .finalize())
                  .then(response => resolve(response))
                  .catch(err => reject(err))
              }, i * 120)
            })
            requests.push(prom)
          }

          Promise.all(requests)
            .then((responses) => {
              let genres = []

              for (let result of responses) {
                for (let item of result.body) {
                  genres[item.id] = item.name
                }
              }

              resolve(genres)
            })
            .catch(err => reject(err))
        })
    })
  }
}

function getRandomGameReal (total, excludes) {
  let builder = new IgdbQueryBuilder()

  // generate random game id that is not in excluded list
  let randomId
  do {
    console.log(total)
    randomId = Math.floor(Math.random() * (total - 1))
  } while (excludes.indexOf(randomId) !== -1)

  // fetch this game
  return Vue.http.get(builder
    .setEndpoint('games')
    .setId(randomId)
    .setFields(['id', 'name', 'slug', 'cover', 'popularity', 'created_at', 'first_release_date', 'release_dates', 'rating'])
    .setLimit(1)
    .finalize())
    .then(response => {
      // if thre result is an empty array, perform random search again
      if (response.body.length === 0) {
        getRandomGameReal(total, excludes)
      } else {
        return response.body[0] || {}
      }
    })
}
