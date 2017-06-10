import igdbApi from '../api/igdb'
import {
  ADD_FAVOURITE_GAME_ALL,
  RECIEVE_PLATFORMS_LIST,
  RECIEVE_PULSE_SOURCES_LIST,
  RECIEVE_GENRES_LIST
} from '../store/mutation-types'

/**
 * Initializes application state
 * @param store
 * @returns {Promise.<TResult>}
 */
export default function (store) {
  // load favourite games
  initFavouriteGames(store)

  // then load lists from API
  return Promise.all([
    initPlatformList(store),
    initPulseSourcesList(store),
    initGenresList(store)
  ])
    .then(() => console.log('state inited'))
}

/**
 * Load FavouriteGames from local storage
 * @param store
 */
function initFavouriteGames (store) {
  try {
    let favouriteGames = localStorage.getItem('favouriteGames')
    favouriteGames = JSON.parse(favouriteGames)
    if (!favouriteGames) {
      favouriteGames = {}
    }
    store.commit(ADD_FAVOURITE_GAME_ALL, favouriteGames)
  } catch (e) {
    console.log(e)
  }
}

/**
 * Load platforms list from local storage or from API
 * @param store
 * @returns {Promise}
 */
function initPlatformList (store) {
  return new Promise((resolve, reject) => {
    // we load platforms from local storage
    let platforms = localStorage.getItem('platforms')

    if (platforms) platforms = JSON.parse(platforms)

    // platforms are not loaded, we fetch them from the API
    if (!Array.isArray(platforms)) {
      igdbApi.getPlatformsList()
        .then(fetchedPlatforms => {
          platforms = fetchedPlatforms
          // attempt to save platforms (can fail if we are in private browsing)
          try {
            localStorage.setItem('platforms', JSON.stringify(fetchedPlatforms))
          } catch (e) {
            console.error(e)
          }

          store.commit(RECIEVE_PLATFORMS_LIST, platforms)
          resolve()
        })
        .catch(err => reject(err))
    } else {
      store.commit(RECIEVE_PLATFORMS_LIST, platforms)
      resolve()
    }
  })
}

function initPulseSourcesList (store) {
  return new Promise((resolve, reject) => {
    let sources = localStorage.getItem('pulseSources')

    if (sources) sources = JSON.parse(sources)

    if (!Array.isArray(sources)) {
      igdbApi.getPulsesSourceList()
        .then(fetchedSources => {
          sources = fetchedSources

          // attempt to save sources to local storage
          try {
            localStorage.setItem('pulseSources', JSON.stringify(fetchedSources))
          } catch (e) {
            console.error(e)
          }

          store.commit(RECIEVE_PULSE_SOURCES_LIST, sources)
          resolve()
        })
        .catch(err => reject(err))
    } else {
      store.commit(RECIEVE_PULSE_SOURCES_LIST, sources)
      resolve()
    }
  })
}

function initGenresList (store) {
  return new Promise((resolve, reject) => {
    let genres = localStorage.getItem('genres')

    if (genres) genres = JSON.parse(genres)

    if (!Array.isArray(genres)) {
      igdbApi.getGenresList()
        .then(fetchedSources => {
          genres = fetchedSources

          // attempt to save sources to local storage
          try {
            localStorage.setItem('genres', JSON.stringify(fetchedSources))
          } catch (e) {
            console.error(e)
          }

          store.commit(RECIEVE_GENRES_LIST, genres)
          resolve()
        })
        .catch(err => reject(err))
    } else {
      store.commit(RECIEVE_GENRES_LIST, genres)
      resolve()
    }
  })
}
