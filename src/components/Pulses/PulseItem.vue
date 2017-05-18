<template>
  <a class="pulse-card" :href="pulseData.url" target="_blank">
    <div class="pulse-infos">

      <lazy-background
        class="pulse-image"
        :image-source="pulseImage"
        :loading-image="require('@/assets/images/pulse-no-image.png')"
        :error-image="require('@/assets/images/pulse-no-image.png')">
      </lazy-background>

      <div class="pulse-content">
        <h3>{{ pulseData.title }}</h3>
        <span class="released">{{ released }} on {{ pulseSource }}</span>
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'pulse-item',
    props: [ 'pulseData' ],
    methods: {},
    computed: {
      pulseImage () {
        return this.pulseData.image || ''
      },
      released () {
        return this.$options.filters.moment(this.pulseData.published_at, 'from')
      },
      pulseSource () {
        return this.$store.state.igdb.pulseSourcesList[this.pulseData.pulse_source] || null
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .pulse-card {
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: $bg-light;
    box-shadow: 0 5px 10px $bg-dark;
    overflow: hidden;
    transition: transform .2s ease-out;

    .pulse-image {
      height: 200px;
      width: 100%;
      background-size: cover;
      transition: background-image 0.4s ease-in-out;
    }

    .pulse-content {
      position: relative;
      padding: 10px;

      h3 {
        font-size: 1.3rem;
      }

      .released {
        position: absolute;
        line-height: 15px;
        padding: 5px;
        top: -25px;
        left: 0;
        background-color: rgba(0, 0, 0,.5);
      }
    }

    &:hover {
      transform: scale(1.02);
    }
  }
</style>
