<template>
  <div class="SimpleGalleryComponent">
    <img class="SimpleGalleryComponent_CurrentImage" :src="currentImage">
    <div class="SimpleGalleryComponent_Images">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'simple-gallery-component',
    props: {
      images: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        current: 0
      }
    },
    computed: {
      imagesCount () {
        return this.images.length
      },
      currentImage () {
        return this.images[this.current]
      }
    }
  }
</script>

<style scoped lang="scss" >
  .SimpleGalleryComponent {

    &_CurrentImage {

    }

    &_Images {

    }
  }
</style>
