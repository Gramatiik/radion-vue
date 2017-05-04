<template>
  <div>
    <router-link class="game-item-card" :to="{ name: 'About' }">
      <img class="game-thumb" :src="gameData.cover | cloudinary('thumb')" />
      <div class="summary">
        <h3>{{ gameData.name }}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eum.</p>
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
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: $bg-light;
    box-shadow: 0 5px 10px $bg-dark;

    .game-thumb {
      max-width: 90px;
      max-height: 120px;
      object-fit: contain;
    }

    .summary {
      margin-left: 12px;
    }
  }
</style>
