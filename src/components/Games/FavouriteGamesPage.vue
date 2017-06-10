<template>
    <div class="FavouriteGamesPage">
      <h1>My Games</h1>
      <button @click="addFav">Add favourite</button>
      <button @click="removeFav">Remove Favourite</button>
      <div v-if="favouriteGames">
        <pre>{{ favouriteGames }}</pre>
      </div>
      <div v-else>
        No favourite games
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { ADD_FAVOURITE_GAME, REMOVE_FAVOURITE_GAME } from '@/store/mutation-types'
  export default {
    name: 'favourite-games-page',
    computed: {
      ...mapState({ favouriteGames: state => state.igdb.favouriteGames })
    },
    methods: {
      ...mapMutations({ADD_FAVOURITE_GAME, REMOVE_FAVOURITE_GAME}),
      addFav () {
        console.log('now adding a new favourite game')
        this.ADD_FAVOURITE_GAME({name: 'asgardia'})
      },
      removeFav () {
        console.log('now removing a favourite game')
        this.REMOVE_FAVOURITE_GAME({name: 'asgardia'})
      }
    }
  }
</script>

<style scoped lang="scss">
    .FavouriteGamesPage {

    }
</style>
