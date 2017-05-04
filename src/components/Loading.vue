<template>
  <transition name="loader">
    <div v-show="loading" class="loading">
      <div class="spinner"></div>
      <div class="backdrop"></div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'rd-loading',
    data () {
      return {}
    },
    computed: {
      ...mapState([ 'loading' ])
    }
  }
</script>

<style scoped lang="scss">
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
    .spinner {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 10px solid white;
      border-top: 10px solid lightcoral;
      top: 50%;
      animation: spin 2s linear infinite;
      z-index: 5001;
    }

    .backdrop {
      z-index: 5000;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
