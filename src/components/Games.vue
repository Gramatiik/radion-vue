<template>
  <div>
    <h1>Games</h1>
    <div class="games-container">
      <game-item class="card-item" v-for="game in recentGames" :key="game.id" :game-data="game"></game-item>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GameItem from '@/components/GameItem'
  export default {
    name: 'games',
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['recentGames'])
    },
    created () {
      this.$store.dispatch('getGames')
    },
    components: {
      GameItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .games-container {
    @include responsiveCardLayout($card-layout-gutter);
  }
</style>
