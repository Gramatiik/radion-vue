<template>
  <transition mode="out-in" name="slide-fade">
    <div>
      <div class="game-header">

        <lazy-background
          class="game-cover"
          :image-source="gameCoverImage"
          :loading-image="require('@/assets/images/pulse-no-image.png')"
          :error-image="require('@/assets/images/pulse-no-image.png')">
        </lazy-background>

        <h1 class="game-name">{{ gameDetails.name }}</h1>

        <lazy-background
          class="game-header-background"
          :image-source="gameCoverImage"
          :loading-image="require('@/assets/images/pulse-no-image.png')"
          :error-image="require('@/assets/images/pulse-no-image.png')">
        </lazy-background>

      </div>
      <pin-platforms class="game-platforms" :platform-ids="platformIds"></pin-platforms>
      <pre>{{ gameDetails }}</pre>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '@/store/'
  import PinPlatforms from '@/components/PinPlatforms/PinPlatforms'
  export default {
    name: 'game-details',
    props: [ 'slug' ],
    methods: {},
    computed: {
      ...mapState({
        gameDetails: state => state.igdb.gameDetails
      }),
      platformIds: function () {
        let platformIds = []
        for (let release of this.gameDetails['release_dates'] || {}) {
          platformIds.push(release.platform)
        }
        return platformIds
      },
      gameCoverImage: function () {
        return this.gameDetails.cover ? this.gameDetails.cover.url : require('@/assets/images/pulse-no-image.png')
      }
    },
    components: {
      PinPlatforms
    },
    beforeRouteEnter (to, from, next) {
      getGameDetails(to, next)
    },
    beforeRouteUpdate (to, from, next) {
      getGameDetails(to, next)
    },
    created () {
      scrollTo(0, 0)
    }
  }

  function getGameDetails (to, next) {
    store.dispatch('getGameBySlug', to.params.slug)
      .then(() => next())
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .game-header {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;

    min-height: 350px;
    background-size: cover;
    overflow: hidden;
    padding: 10px 5px;

    .game-cover, .game-header-background {
      background: $font-light center;
    }

    .game-cover {
      box-shadow: 2px 2px 12px rgba(#000, .9);
      width: 90px;
      height: 128px;
      margin: 0 auto;
    }


    .game-header-background {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      filter: blur(15px);
      transform: scale(1.2);
      z-index: -1;
    }

    .game-name {
      text-align: center;
      line-height: 3.3rem;
      font-size: 3.5rem;
      color: $font-light;
      text-shadow: 2px 2px 5px #000;
      margin: 25px 20px 40px;
    }
  }
</style>
