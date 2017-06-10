<template>
  <div class="TopBarComponent">

    <div class="TopBarComponent_TopMenu">
      <div class="TopBarComponent_TopMenu_Burger" @click="MENU_TOGGLE" :class="{ opened: menuOpened }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="TopBarComponent_TopMenu_BrandIcon"></div>
      <div class="TopBarComponent_TopMenu_BrandName">Radion</div>
    </div>

    <div class="TopBarComponent_Backdrop" @click="MENU_TOGGLE" :class="{ visible: menuOpened }"></div>
    <nav class="TopBarComponent_SideNav" :class="{ opened: menuOpened }">
      <games-search-component></games-search-component>
      <navigation-item-component
        class="TopBarComponent_SideNav_Item"
        v-for="menuEntry in menuItems"
        :key="menuEntry.title"
        :title="menuEntry.title"
        :icon="menuEntry.icon"
        :route="menuEntry.route">
      </navigation-item-component>
    </nav>

  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { MENU_TOGGLE } from '@/store/mutation-types'
  import NavigationItemComponent from '@/components/Shared/NavigationItemComponent'
  import GamesSearchComponent from '@/components/Games/GamesSearchComponent'
  export default {
    name: 'top-bar-component',
    components: {
      NavigationItemComponent,
      GamesSearchComponent
    },
    data () {
      return {
        menuItems: [
          {
            title: 'Home',
            icon: 'Home',
            route: {
              name: 'Home'
            }
          },
          {
            title: 'Games',
            icon: 'Games',
            route: {
              name: 'GamesDefault'
            }
          },
          {
            title: 'My Games',
            icon: 'Favourite',
            route: {
              name: 'FavouriteGames'
            }
          },
          {
            title: 'Discover',
            icon: 'Discover',
            route: {
              name: 'Discover'
            }
          },
          {
            title: 'Platforms',
            icon: 'Platforms',
            route: {
              name: 'Platforms'
            }
          },
          {
            title: 'Pulses',
            icon: 'Pulse',
            route: {
              name: 'Pulses'
            }
          },
          {
            title: 'Settings',
            icon: 'Settings',
            route: {
              name: 'Settings'
            }
          }
        ]
      }
    },
    methods: {
      ...mapMutations([ MENU_TOGGLE ])
    },
    computed: mapState([ 'menuOpened' ])
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .TopBarComponent {

    &_TopMenu {
      position: fixed;
      top: 0;
      z-index: 100;
      background-color: $primary;
      width: 100%;
      height: 50px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

      &_BrandIcon {
        position: absolute;
        top: 5px;
        left: 70px;
        width: 40px;
        height: 40px;
        background-image: url("../../assets/images/radion-logo.png");
        background-size: contain;
      }

      &_BrandName {
        position: absolute;
        top: 6px;
        left: 120px;
        font-size: 28px;
        font-weight: bold;
        color: $font-light;
      }

      &_Burger {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 28px;
        margin-left: 10px;
        margin-top: 11px;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;

        span {
          display: block;
          position: absolute;
          height: 4px;
          width: 100%;
          background: $font-light;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;

          &:nth-child(1) {
            top: 0;
          }
          &:nth-child(2), &:nth-child(3) {
            top: 12px;
          }
          &:nth-child(4) {
            top: 24px;
          }
        }

        &.opened {
          span {
            &:nth-child(1) {
              top: 12px;
              width: 0;
              left: 50%;
            }
            &:nth-child(2) {
              transform: rotate(45deg);
            }
            &:nth-child(3) {
              transform: rotate(-45deg);
            }
            &:nth-child(4) {
              top: 12px;
              width: 0;
              left: 50%;
            }
          }
        }
      }
    }

    &_Backdrop {
      visibility: hidden;
      opacity: 0;
      position: fixed;
      z-index: 98;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: visibility 0s, opacity 0.2s linear;

      &.visible {
        visibility: visible;
        opacity: 1;
      }
    }

    &_SideNav {
      height: 100%;
      width: 0;
      opacity: 0;
      position: fixed;
      z-index: 99;
      top: 50px;
      left: 0;
      background-color: $primary;
      box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.5);
      overflow-x: hidden;
      transition: opacity 0.1s, width 0.2s;
      padding-top: 10px;

      &.opened {
        opacity: 1;
        width: 100%;

        @media screen and (min-width: $bp-mobile){
          width: 280px;
        }
        @media screen and (min-width: $bp-tablet){
          width: 560px;
        }
      }

      &_Item {
        margin-bottom: 15px;
      }
    }
  }
</style>
