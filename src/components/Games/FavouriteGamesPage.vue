<template>
    <div class="FavouriteGamesPage">
      <h1>My Games</h1>
      <div v-if="favouriteGames" class="CardLayout">
        <game-item-component class="CardLayout_Item" v-for="item in favouriteGames" :key="item.id" :game-data="item"></game-item-component>
      </div>
      <div v-else>
        No favourite games
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { ADD_FAVOURITE_GAME, REMOVE_FAVOURITE_GAME } from '@/store/mutation-types'
  import GameItemComponent from '@/components/Games/GameItemComponent'
  export default {
    name: 'favourite-games-page',
    components: {
      GameItemComponent
    },
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
  @import "variables";
    .FavouriteGamesPage {
      &_Item {
        position: relative;
        &_Remove {
          position: absolute;
          bottom: 5px;
          left: 5px;
          background-color: $primary;
          padding: 2px 4px;
          font-size: .8rem;
          text-align: center;
          border-radius: 5px;
        }
      }
    }
</style>
