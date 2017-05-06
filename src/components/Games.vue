<template>
  <div>
    <h1 class="page-title">{{ title }}</h1>
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
    props: [ 'ordering' ],
    data () {
      return {
        title: 'Games'
      }
    },
    computed: {
      ...mapState({
        games: state => state.gamesModule.games
      })
    },
    methods: {
      loadGames () {
        this.title = this.ordering === 'recent' ? 'Recent Games' : 'Popular Games'
        this.$store.dispatch('getGamesList', this.ordering === 'recent' ? 'created_at' : 'popularity')
      }
    },
    watch: {
      '$route' (to, from) {
        this.loadGames()
      }
    },
    created () {
      this.loadGames()
    },
    components: {
      GameItem
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .games-container {
    @include responsiveCardLayout($card-layout-gutter);
  }
</style>
