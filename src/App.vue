<template>
  <div id="app">
    <rd-loading></rd-loading>
    <top-bar></top-bar>
    <menu-bar></menu-bar>
    <img src="./assets/images/logo.png">
    <router-view></router-view>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
