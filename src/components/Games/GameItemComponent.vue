<template>
  <div class="GameItemComponent">
    <div class="GameItemComponent_Card">
      <div class="GameItemComponent_Card_Thumb" :style="{ backgroundImage: cardThumb }"></div>
      <div class="GameItemComponent_Content">
        <h3>{{ gameData.name }}</h3>
        <span class="release-date">Released {{ new Date(gameData.first_release_date) | moment("from", "now") }}</span>
      </div>
      <pin-platforms class="GameItemComponent_Card_Platforms" :platform-ids="platformIds"></pin-platforms>
    </div>
    <div class="GameItemComponent_Actions">

      <div class="GameItemComponent_Actions_Item" @click="toggleFavourite">
        <div class="Icon Icon-small" :class="isFavourite ? 'Icon-Favourite' : 'Icon-Favourite-empty' "></div>
      </div>
      <router-link class="GameItemComponent_Actions_Item" :to="{ name: 'GameDetails', params: {slug: gameData.slug} }">
        <div class="Icon Icon-small Icon-Details"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { ADD_FAVOURITE_GAME, REMOVE_FAVOURITE_GAME } from '@/store/mutation-types'
  import PinPlatforms from '@/components/PinPlatforms/PinPlatformsComponent'
  export default {
    name: 'game-item-component',
    props: [ 'gameData' ],
    components: {
      PinPlatforms
    },
    computed: {
      cardThumb: function () {
        return `url("${this.$options.filters.cloudinary(this.gameData.cover.cloudinary_id, 'thumb')}")`
      },
      platformIds: function () {
        let platformIds = []
        for (let release of this.gameData['release_dates'] || {}) {
          platformIds.push(release.platform)
        }
        return platformIds
      },
      isFavourite () {
        return !!this.$store.state.igdb.favouriteGames[this.gameData.name]
      }
    },
    methods: {
      ...mapMutations({ ADD_FAVOURITE_GAME, REMOVE_FAVOURITE_GAME }),
      toggleFavourite () {
        if (this.isFavourite) {
          this.REMOVE_FAVOURITE_GAME(this.gameData)
        } else {
          this.ADD_FAVOURITE_GAME(this.gameData)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .GameItemComponent {
    box-shadow: 0 5px 10px $bg-dark;
    margin-bottom: 10px;
    margin-top: 10px;
    height: 100%;

    &_Card {
      display: block;
      padding: 5px;
      min-height: 90px;
      background-color: $bg-light;

      &_Thumb {
        float: left;
        width: 90px;
        height: 90px;
        background-size: cover;
        margin-right: 10px;
        box-shadow: 1px 1px 5px $bg-dark;
      }

      &_Content h3 {
        font-size: 1.4rem;
      }

      &_Platforms {
        padding-top: 5px;
        clear: both;
      }
    }

    &_Actions {
      display: flex;
      flex-flow: row nowrap;
      background-color: $primary;
      padding: 5px 0;

      &_Item {
        width: 100%;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: white;
        transition: transform .2s ease-out;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
</style>
