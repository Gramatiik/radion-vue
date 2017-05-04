<template>
  <div id="app">
    <rd-loading></rd-loading>
    <top-bar></top-bar>
    <menu-bar></menu-bar>
    <div class="wrapper">
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
export default {
  name: 'app',
  components: {
    RdLoading,
    TopBar,
    MenuBar
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

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .wrapper {
    margin-top: 60px;
    width: 100%;

    @media screen and (min-width: $bp-desktop) {
      width: $bp-desktop;
      margin-left: auto;
      margin-right: auto;
    }
  }

  a {
    text-decoration: none;
    color: $accent;
  }
</style>
