import igdbApi from '../api/igdb'
import {
  RECIEVE_PLATFORMS_LIST,
  RECIEVE_PULSE_SOURCES_LIST
} from '../store/mutation-types'

export default function (store) {
  return Promise.all([
    initPlatformList(store),
    initPulseSourcesList(store)
  ])
    .then(() => console.log('state inited'))
}

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
