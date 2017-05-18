<template>
  <div id="app">
    <div class="window"></div>
    <rd-loading></rd-loading>
    <top-bar></top-bar>
    <div class="wrapper">
      <router-view></router-view>
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
  @import "transitions";
</style>
