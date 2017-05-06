<template>
  <div>
    <h1>Games</h1>
    <div class="games-container">
      <game-item class="card-item" v-for="item in games" :key="item.id" :game-data="item"></game-item>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GameItem from '@/components/GameItem'
  export default {
    name: 'games',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        games: state => state.gamesModule.games
      })
    },
    created () {
      console.log(this.games)
      this.$store.dispatch('getLatestGames', 50)
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
