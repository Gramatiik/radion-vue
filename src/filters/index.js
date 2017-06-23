import Vue from 'vue'

Vue.filter('cloudinary', function (value, type) {
  let CLOUDINARY_URL = 'https://images.igdb.com/igdb/image/upload'

  if (!value) {
    return require('@/assets/images/no-image.png')
  } else {
    if (type === 'original') {
      return `${CLOUDINARY_URL}/${value}.jpg`
    }

    return `${CLOUDINARY_URL}/t_${type}/${value}.jpg`
  }
})

Vue.filter('capitalize', function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
})
