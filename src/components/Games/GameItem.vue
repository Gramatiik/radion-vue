<template>
  <div>
    <router-link class="game-item-card" :to="{ name: 'GameDetails', params: {slug: gameData.slug} }">
      <div class="game-thumb" :style="{ backgroundImage: cardThumb }"></div>
      <div class="game-infos">
        <h3>{{ gameData.name }}</h3>
        <span class="release-date">Released {{ new Date(gameData.first_release_date) | moment("from", "now") }}</span>
      </div>
      <pin-platforms class="game-platforms" :platform-ids="platformIds"></pin-platforms>
    </router-link>
  </div>
</template>

<script>
  import PinPlatforms from '../PinPlatforms/PinPlatforms.vue'
  export default {
    name: 'game-item',
    props: [ 'gameData' ],
    methods: {},
    computed: {
      cardThumb: function () {
        return `url("${this.$options.filters.cloudinary(this.gameData.cover, 'thumb_2x')}")`
      },
      platformIds: function () {
        let platformIds = []
        for (let release of this.gameData['release_dates'] || {}) {
          platformIds.push(release.platform)
        }
        return platformIds
      }
    },
    components: {
      PinPlatforms
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .game-item-card {
    display: block;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 90px;
    background-color: $bg-light;
    box-shadow: 0 5px 10px $bg-dark;
    transition: transform .2s ease-out;

    &:hover {
      transform: scale(1.02);
    }

    .game-thumb {
      float: left;
      width: 90px;
      height: 90px;
      background-size: cover;
      margin-right: 10px;
      box-shadow: 1px 1px 5px $bg-dark;
    }

    .game-infos h3 {
      font-size: 1.4rem;
    }

    .game-platforms {
      padding-top: 5px;
      clear: both;
    }
  }
</style>
