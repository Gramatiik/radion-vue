<template>
  <div>
    <h1 class="page-title">Games</h1>

    <div class="segment">
      <router-link :to="{ name: 'PopularGames' }">Popular</router-link>
      <router-link :to="{ name: 'RecentGames' }">Recent</router-link>
      <router-link :to="{ name: 'BestRatedGames' }">Rating</router-link>
    </div>

    <div v-if="!apiFailure">
      <div class="games-container"
           v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="listLoading || apiFailure"
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
    computed: {
      ...mapState({
        games: state => state.igdb.games,
        listLoading: state => state.listLoading,
        apiFailure: state => state.apiFailure
      }),
      ...mapGetters(['gamesCount'])
    },
    methods: {
      dispatchGamesAction () {
        this.$store.dispatch('getGamesList', { orderingField: this.ordering, offset: this.gamesCount })
      },
      initGames () {
        this.$store.commit(CLEAR_GAMES)
        this.dispatchGamesAction()
      },
      loadMore () {
        this.dispatchGamesAction()
      },
      retry () {
        this.$store.commit(API_FAILURE, false)
        this.dispatchGamesAction()
      }
    },
    watch: {
      '$route' () {
        this.initGames()
      }
    },
    created () {
      this.initGames()
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
