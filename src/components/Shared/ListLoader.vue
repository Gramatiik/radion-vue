<template>
  <div class="spinner" v-if="loading">
    <div class="double-bounce double-bounce-1"></div>
    <div class="double-bounce double-bounce-2"></div>
  </div>
</template>

<script>
  export default {
    name: 'list-loader',
    props: ['loading']
  }
</script>

<style lang="scss">
  @import "variables";

  .spinner {
    width: 50px;
    height: 50px;
    position: relative;
    margin: 10px auto;

    .double-bounce {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;

      animation: sk-bounce 2.0s infinite ease-in-out;

      &-1 {
        background-color: $primary;
      }

      &-2 {
        background-color: $accent;
        animation-delay: -1.0s;
      }
    }
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { transform: scale(0.0) }
    50% { transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
      }
  }
</style>
