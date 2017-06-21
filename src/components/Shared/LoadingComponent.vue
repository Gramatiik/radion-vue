<template>
  <transition name="loader">
    <div v-show="loading" class="loading">
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'loading-component',
    computed: {
      ...mapState([ 'loading' ])
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loader-enter, .loader-leave-to {
    opacity: 0
  }

  .loader-enter-active, .loader-leave-active {
    transition: all 0.5s;
  }

  .loading {
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba($bg-dark, .7);
    z-index: 5000;

    .spinner {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 10px solid $font-light;
      border-top-color: $primary;
      animation: spin 2s linear infinite;
      z-index: 5001;
    }
  }
</style>
