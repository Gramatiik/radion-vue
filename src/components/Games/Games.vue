<template>
  <div>
    <h1 class="page-title">{{ title }}</h1>

    <div v-if="!apiFailure">
      <div class="games-container"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="listLoading"
           infinite-scroll-distance="3">
        <game-item class="card-item" v-for="item in games" :key="item.id" :game-data="item"></game-item>
      </div>
    </div>
    <div v-else style="text-align: center">
      Unable to load games...
      <button @click="retry">Try again ?</button>
    </div>

    <div class="spinner" v-if="listLoading && !apiFailure">
      <div class="double-bounce double-bounce-1"></div>
      <div class="double-bounce double-bounce-2"></div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_GAMES } from '@/store/mutation-types'
  import GameItem from '@/components/Games/GameItem'
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
        games: state => state.igdb.games,
        listLoading: state => state.listLoading,
        apiFailure: state => state.apiFailure
      }),
      ...mapGetters(['gamesCount'])
    },
    methods: {
      loadGames () {
        this.title = this.ordering === 'recent' ? 'Recent Games' : 'Popular Games'

        // clear saved games at component startup
        this.$store.commit(CLEAR_GAMES)

        // load initial data
        this.$store.dispatch('getGamesList', { orderingField: this.ordering, offset: this.gamesCount })
      },
      loadMore () {
        // load more data
        this.$store.dispatch('getGamesList', { orderingField: this.ordering, offset: this.gamesCount })
      },
      retry () {
        this.$store.commit(API_FAILURE, false)
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
