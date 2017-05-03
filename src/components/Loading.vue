<template>
  <div v-show="loading" class="loading">
    <div class="spinner"></div>
    <div class="backdrop"></div>
  </div>
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
  .loading {
    transition: all .5s ease-out;

    .spinner {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: red;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
