<template>
  <div>
    <router-link class="game-item-card" :to="{ name: 'GameDetails', params: {slug: gameData.slug} }">
      <div class="game-thumb" :style="{ backgroundImage: cardThumb }"></div>
      <div class="game-infos">
        <h3>{{ gameData.name }}</h3>
        <span class="release-date">Released {{ new Date(gameData.first_release_date) | moment("from", "now") }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'game-item',
    props: [ 'gameData' ],
    methods: {},
    computed: {
      cardThumb: function () {
        return `url("${this.$options.filters.cloudinary(this.gameData.cover, 'thumb_2x')}")`
      }
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

    .game-thumb {
      float: left;
      width: 90px;
      height: 90px;
      background-size: cover;
      margin-right: 5px;
    }
  }
</style>
