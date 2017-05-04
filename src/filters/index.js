import Vue from 'vue'

Vue.filter('cloudinary', function (value, type) {
  let CLOUDINARY_URL = 'https://images.igdb.com/igdb/image/upload'

  if (!value) {
    return require('@/assets/images/no-image.png')
  } else {
    if (type === 'original') {
      return `${CLOUDINARY_URL}/${value.cloudinary_id}.png`
    }

    return `${CLOUDINARY_URL}/t_${type}/${value.cloudinary_id}.png`
  }
})
