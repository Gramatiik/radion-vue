<template>
  <div>
    <div class="backdrop" @click="MENU_TOGGLE" :class="{ visible: menuOpened }"></div>
    <nav class="sidenav" :class="{ opened: menuOpened }">
      <menu-bar-item title="Settings" icon="settings" :route="{ name: 'About' }"></menu-bar-item>
      <menu-bar-item title="Games" icon="games" :route="{ name: 'Games' }"></menu-bar-item>
      <menu-bar-item title="Pulses" icon="pulse" :route="{ name: 'Pulses' }"></menu-bar-item>
    </nav>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { MENU_TOGGLE } from '@/store/mutation-types'
  import MenuBarItem from '@/components/MenuBarItem'
  export default {
    name: 'menu-bar',
    data () {
      return {}
    },
    methods: {
      ...mapMutations([ MENU_TOGGLE ])
    },
    computed: {
      ...mapState([ 'menuOpened' ])
    },
    components: {
      MenuBarItem
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .backdrop {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    z-index: 9;
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

  .sidenav {
    height: 100%;
    width: 0;
    opacity: 0;
    position: fixed;
    z-index: 10;
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
  }
</style>
