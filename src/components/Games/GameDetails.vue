<template>
  <transition mode="out-in" name="slide-fade">
    <div>
      <div class="game-header">

        <img class="game-cover" :src="gameCoverImage" alt="Cover">

        <h1 class="game-name">{{ gameDetails.name }}</h1>

        <span class="game-release-date">Released on {{ new Date(gameDetails.first_release_date) | moment("MMMM D, YYYY") }}</span>

        <lazy-background
          class="game-header-background"
          :image-source="gameCoverBackgroundImage"
          :loading-image="require('@/assets/images/pulse-no-image.png')"
          :error-image="require('@/assets/images/pulse-no-image.png')">
        </lazy-background>

      </div>

      <pin-platforms class="game-platforms" :platform-ids="platformIds" :pin-size="1.2"></pin-platforms>

      <div class="game-info-section" v-if="gameDetails.summary">
        <h2>Summary</h2>
        <p v-html="gameDetails.summary"></p>
      </div>

      <div class="game-info-section" v-if="gameDetails.storyline">
        <h2>Storyline</h2>
        <p v-html="gameDetails.storyline"></p>
      </div>

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
      gameCoverBackgroundImage: function () {
        return this.gameDetails.cover ? this.gameDetails.cover.url : require('@/assets/images/pulse-no-image.png')
      },
      gameCoverImage: function () {
        return this.$options.filters.cloudinary(this.gameDetails.cover, 'cover_small_2x')
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
    margin-bottom: 5px;
    padding: 10px 5px 1.8rem;

    .game-cover, .game-header-background {
      background: $font-light center;
    }

    .game-cover {
      box-shadow: 2px 2px 12px rgba(#000, .9);
      object-fit: contain;
      min-width: 90px;
      min-height: 90px;
      max-width: 200px;
      max-height: 200px;
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

    .game-release-date {
      position: absolute;
      bottom: 0px;
      left: 0px;
      padding: 5px;
      background-color: rgba(#000, .4);
      font-size: 1.4rem;
      color: $accent;
    }
  }
</style>
