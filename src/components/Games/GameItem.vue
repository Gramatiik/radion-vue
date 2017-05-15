<template>
  <div>
    <router-link class="game-item-card" :to="{ name: 'GameDetails', params: {slug: gameData.slug} }">
      <img class="game-thumb" :src="gameData.cover | cloudinary('thumb_2x')" />
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
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .game-item-card {
    display: flex;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 90px;
    background-color: $bg-light;
    box-shadow: 0 5px 10px $bg-dark;

    .game-thumb {
      width: 90px;
      height: 90px;
      object-fit: contain;
    }

    .game-infos {
      margin-left: 5px;
    }
  }
</style>
