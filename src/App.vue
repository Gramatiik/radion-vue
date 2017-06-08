<template>
  <div id="app">
    <div class="window"></div>
    <loading-component></loading-component>
    <top-bar-component></top-bar-component>
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
  @import "main";
</style>
