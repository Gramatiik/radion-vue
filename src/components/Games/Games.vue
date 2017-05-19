<template>
  <transition mode="out-in" name="slide-fade">
    <div>
      <h1 class="page-title">Games</h1>

      <div class="segment">
        <router-link class="segment-item" :to="{ name: 'Games', params: { ordering: 'popular' } }">Popular</router-link>
        <router-link class="segment-item" :to="{ name: 'Games', params: { ordering: 'recent' } }">Recent</router-link>
        <router-link class="segment-item" :to="{ name: 'Games', params: { ordering: 'top-rated' } }">Top Rated</router-link>
      </div>

      <div v-if="!apiFailure">
        <div class="games-container">
          <game-item class="card-item" v-for="item in games" :key="item.id" :game-data="item"></game-item>
        </div>
        <list-loader :loading="listLoading" :load-more="loadMore"></list-loader>
      </div>
      <div v-else style="text-align: center">
        Unable to load games...
        <button @click="retry">Try again ?</button>
      </div>

    </div>
  </transition>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_GAMES } from '@/store/mutation-types'
  import GameItem from '@/components/Games/GameItem'
  import ListLoader from '@/components/Shared/ListLoader'
  import store from '@/store/'
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
      loadMore () {
        this.dispatchGamesAction()
      },
      retry () {
        this.$store.commit(API_FAILURE, false)
        this.dispatchGamesAction()
      }
    },
    beforeRouteEnter (to, from, next) {
      getGames(to, next)
    },
    beforeRouteUpdate (to, from, next) {
      getGames(to, next)
    },
    components: {
      GameItem,
      ListLoader
    }
  }

  function getGames (to, next) {
    store.commit(CLEAR_GAMES)
    store.dispatch('getGamesList', { orderingField: to.params.ordering, offset: store.getters.gamesCount })
      .then(() => next())
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .games-container {
    @include responsiveCardLayout($card-layout-gutter);
  }
</style>
