<template>
    <div class="HomePage">
      <div class="HomePage_Links grid-4 has-gutter">
        <router-link
          v-for="item in links"
          :key="item.name"
          class="HomePage_Links_Item"
          :class="item.classes"
          :to="item.route">
          <div class="HomePage_Links_Item_Background"></div>
            {{ item.name }}
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'home-page',
    data () {
      return {
        links: [
          {
            name: 'Discover',
            classes: [ 'full', 'discover' ],
            route: { name: 'Discover' }
          },
          {
            name: 'Games',
            classes: [ 'one-half', 'HomePage_Links_Item-big', 'games' ],
            route: { name: 'GamesDefault' }
          },
          {
            name: 'Pulses',
            classes: [ 'one-half', 'HomePage_Links_Item-big', 'pulses' ],
            route: { name: 'Pulses' }
          },
          {
            name: 'Platforms',
            classes: [ 'one-third', 'platforms' ],
            route: { name: 'Platforms' }
          },
          {
            name: 'My Games',
            classes: [ 'one-third', 'my-games' ],
            route: { name: 'FavouriteGames' }
          },
          {
            name: 'Settings',
            classes: [ 'one-third' ],
            route: { name: 'Settings' }
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .HomePage {
    padding-top: 15px;
    margin-bottom: 15px;

    &_Links_Item {
      display: block;
      background-color: $primary;
      overflow: hidden;
      color: white;
      box-shadow: 0 5px 10px $bg-dark;
      font-size: 1.6rem;
      text-align: center;
      height: 80px;
      line-height: 80px;
      margin-bottom: 1rem;
      font-weight: bold;
      text-shadow: 0 2px 4px black;

      @include responsiveMinWidth($bp-tablet) {
        height: 140px;
        line-height: 140px;


      }

      &-big {
        height: 160px;
        line-height: 160px;

        @include responsiveMinWidth($bp-tablet) {
          height: 240px;
          line-height: 240px;
        }
      }

      &.discover {
        background-color: $accent;
        color: $font-light;
      }

      // TODO : make background images inline
      &.my-games {
        background: url("../assets/images/my_games_homepage.jpg") no-repeat center;
      }

      &.pulses {
        background: url("../assets/images/pulses_homepage.jpg") no-repeat center;
      }

      &.games {
        background: url("../assets/images/games_homepage.jpg") no-repeat center;
      }

      &.platforms {
        background: url("../assets/images/platforms_homepage.jpg") no-repeat center;
      }
    }
  }
</style>
