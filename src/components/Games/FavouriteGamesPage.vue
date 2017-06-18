<template>
    <div class="FavouriteGamesPage">
      <h1>My Games</h1>
      <div v-if="Object.keys(favouriteGames).length != 0" class="grid-3-small-2 has-gutter">
        <game-item-component v-for="item in favouriteGames" :key="item.id" :game-data="item"></game-item-component>
      </div>
      <div v-else>
        <div class="FavouriteGamesPage_NoFavourites">
          <h2>No favourite games</h2>
          <p>Add favourites games from the <router-link :to="{ name: 'GamesDefault' }">games page</router-link></p>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GameItemComponent from '@/components/Games/GameItemComponent'
  export default {
    name: 'favourite-games-page',
    components: {
      GameItemComponent
    },
    computed: {
      ...mapState({ favouriteGames: state => state.igdb.favouriteGames })
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
    .FavouriteGamesPage {
      &_NoFavourites {
        margin-top: 30px;
        text-align: center;
      }
    }
</style>
