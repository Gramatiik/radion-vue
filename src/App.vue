<template>
  <div id="app">
    <div class="window"></div>
    <rd-loading></rd-loading>
    <top-bar></top-bar>
    <div class="wrapper">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import TopBar from './components/Shared/TopBar'
  import RdLoading from './components/Shared/Loading'
  import PinPlatforms from './components/PinPlatforms/PinPlatforms'
  export default {
    name: 'app',
    components: {
      RdLoading,
      TopBar,
      PinPlatforms
    }
  }
</script>

<style lang="scss">
  @import "~node.normalize.scss/normalize";
  @import "icons";
  @import "variables";
  @import "typography";
  @import "layout";

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    // transform: translateX(-30px);
    opacity: 0;
  }
</style>
