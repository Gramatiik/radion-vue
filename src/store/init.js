import igdbApi from '../api/igdb'
import { RECIEVE_PLATFORMS_LIST } from '../store/mutation-types'

export default function (store) {
  initPlatformList(store)
}

function initPlatformList (store) {
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
      })
  }

  store.commit(RECIEVE_PLATFORMS_LIST, platforms)
}
