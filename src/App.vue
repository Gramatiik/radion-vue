<template>
  <div id="app">
    <div class="window"></div>
    <loading-component></loading-component>
    <top-bar-component></top-bar-component>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBarComponent from './components/Shared/TopBarComponent'
  import LoadingComponent from './components/Shared/LoadingComponent'
  export default {
    name: 'app',
    components: {
      LoadingComponent,
      TopBarComponent
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
