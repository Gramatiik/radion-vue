<template>
  <div @click="MENU_TOGGLE">
    <router-link class="container" :to="route">
      <span :class="[ iconClass ]"></span>
      <div class="menu-title">{{ title }}</div>
    </router-link>
    <hr>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { MENU_TOGGLE } from '@/store/mutation-types'
  export default {
    name: 'navigation-item',
    props: [ 'title', 'icon', 'route' ],
    methods: {
      ...mapMutations([MENU_TOGGLE])
    },
    computed: {
      iconClass () {
        return 'icon-' + this.icon
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "mixins";
  @import "variables";

  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    transition: all .1s ease-in-out;

    &.router-link-active {
      font-weight: bold;
    }

    span {
      margin-left: 12px;
      margin-right: 10px;
    }

    .menu-title {
      line-height: 36px;
      font-size: 1.4rem;
      color: $font-light;
    }

    &:hover {
      transform: translateX(5px);
    }
  }

  hr {
    margin: 5px 12px;
    border: none;
    height: 1px;
    background: linear-gradient(to right, rgba(30,87,153,0) 0%,rgba(255,255,255,1) 1%,rgba(125,185,232,0) 100%);
  }


</style>
