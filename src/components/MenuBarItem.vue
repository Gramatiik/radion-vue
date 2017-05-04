<template>
  <div>
    <router-link class="container" :to="route">
      <span :class="[ iconClass ]"></span>
      <div class="menu-title">{{ title }}</div>
    </router-link>
    <hr>
  </div>
</template>

<script>
  export default {
    name: 'menu-bar-item',
    props: [ 'title', 'icon', 'route' ],
    data () {
      return {
        iconClass: 'icon-' + this.icon
      }
    },
    methods: {
      goto () {
        // slip
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "mixins";

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    transition: all .1s ease-in-out;

    span {
      margin-left: 12px;
      margin-right: 10px;
    }

    .menu-title {
      @include menuStyle;
      line-height: 36px;
      font-size: 1.4rem;
    }

    &:hover {
      transform: translateX(5px);
    }
  }

  hr {
    margin: 5px 12px;
    border: none;
    height: 1px;
    background: linear-gradient(to right, rgba(30,87,153,0) 0%,rgba(255,255,255,1) 50%,rgba(125,185,232,0) 100%);
  }


</style>
