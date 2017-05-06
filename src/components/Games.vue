<template>
  <div>
    <h1 class="page-title">{{ title }}</h1>

    <div class="games-container"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="listLoading"
         infinite-scroll-distance="3">
      <game-item class="card-item" v-for="item in games" :key="item.id" :game-data="item"></game-item>
    </div>

    <div class="spinner" v-if="listLoading">
      <div class="double-bounce double-bounce-1"></div>
      <div class="double-bounce double-bounce-2"></div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
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
        games: state => state.gamesModule.games,
        listLoading: state => state.listLoading
      }),
      ...mapGetters(['gamesCount'])
    },
    methods: {
      loadGames () {
        this.title = this.ordering === 'recent' ? 'Recent Games' : 'Popular Games'

        // clear saved games at component startup
        this.$store.commit('CLEAR_GAMES')

        // load initial data
        this.$store.dispatch('getGamesList', { orderingField: this.ordering, offset: this.gamesCount })
      },
      loadMore () {
        // load more data
        this.$store.dispatch('getGamesList', { orderingField: this.ordering, offset: this.gamesCount })
      }
    },
    watch: {
      '$route' () {
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
