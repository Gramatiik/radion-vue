<template>
  <div class="GamesPage">
    <h1 class="GamesPage_Title">{{ query ? 'Search results' : 'Games' }}</h1>

    <div class="Segment" v-if="!query">
      <router-link v-for="value in orderings" :key="value.param" class="Segment_Item" :to="{ name: 'Games', params: { ordering: value.param } }">{{ value.name }}</router-link>
    </div>

    <div v-if="!apiFailure">
      <div class="GamesPage_GamesContainer CardLayout">
        <game-item-component class="CardLayout_Item" v-for="item in games" :key="item.id" :game-data="item"></game-item-component>
      </div>
      <list-loader-component v-if="!query" :loading="listLoading" :load-more="loadMore"></list-loader-component>
    </div>
    <div v-else style="text-align: center">
      Unable to load games...
      <button v-if="!query" @click="retry">Try again ?</button>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_GAMES } from '@/store/mutation-types'
  import GameItemComponent from '@/components/Games/GameItemComponent'
  import ListLoaderComponent from '@/components/Shared/ListLoaderComponent'
  import store from '@/store/'
  export default {
    name: 'games-page',
    props: {
      ordering: {
        type: String,
        required: false,
        default: 'popular',
        validator: function (value) {
          return !(['popular', 'recent', 'top-rated'].indexOf(value) === -1)
        }
      },
      query: {
        type: String,
        required: false,
        default: null
      }
    },
    data () {
      return {
        orderings: [
          {
            name: 'Popular',
            param: 'popular'
          },
          {
            name: 'Recent',
            param: 'recent'
          },
          {
            name: 'Ratings',
            param: 'top-rated'
          }
        ]
      }
    },
    components: {
      GameItemComponent,
      ListLoaderComponent
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
    }
  }

  function getGames (to, next) {
    store.commit(CLEAR_GAMES)

    // if query param is set, perform a search query
    if (to.params.query) {
      store.dispatch('searchForGames', to.params.query)
        .then(() => next())
    } else { // else just fetch some games
      store.dispatch('getGamesList', { orderingField: to.params.ordering, offset: store.getters.gamesCount })
        .then(() => next())
    }
  }
</script>
