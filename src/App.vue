<template>
  <div id="app">
    <div class="window"></div>
    <rd-loading></rd-loading>
    <top-bar></top-bar>
    <menu-bar></menu-bar>
    <div class="wrapper" v-show="!loading">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import MenuBar from './components/MenuBar'
import RdLoading from './components/Loading'
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['loading'])
  },
  components: {
    RdLoading,
    TopBar,
    MenuBar
  },
  created () {
    console.log('SUce mon slip' + Math.random())
  }
}
</script>

<style lang="scss">
  @import "~node.normalize.scss/normalize";
  @import "icons";
  @import "variables";
  @import "typography";

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-30px);
    opacity: 0;
  }

  @keyframes slideInFromRight {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  div.window {
    z-index: 15000;
    animation: slideInFromRight 0.5s linear;
    animation-fill-mode: forwards;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: $accent;
  }

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: linear-gradient(to right, rgba(226,226,226,1) 1%,rgba(255,255,255,1) 50%,rgba(226,226,226,1) 100%);
  }

  .wrapper {
    margin-top: 49px;
    width: 92%;
    margin-left: auto;
    margin-right: auto;

    @include responsiveMinWidth($bp-desktop) {
      width: $bp-desktop;
    }
  }

  a {
    text-decoration: none;
    color: $accent;
  }
</style>
