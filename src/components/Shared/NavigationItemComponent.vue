<template>
  <div @click="MENU_TOGGLE" class="NavigationItemComponent">
    <router-link class="NavigationItemComponent_Link" :to="route">
      <span class="NavigationItemComponent_Link_Icon" :class="[ iconClass ]"></span>
      <div class="NavigationItemComponent_Link_Title">{{ title }}</div>
    </router-link>
    <hr class="NavigationItemComponent_Separator">
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
        return 'Icon Icon-' + this.icon
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "mixins";
  @import "variables";

  .NavigationItemComponent {

    &_Link {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 5px;
      transition: all .15s ease-out;

      &:hover, &.router-link-active {
        transform: translateX(10px);
      }

      &.router-link-active {
        font-weight: bold;
      }

      &_Icon {
        margin-left: 12px;
        margin-right: 10px;
      }

      &_Title {
        line-height: 36px;
        font-size: 1.4rem;
        color: $font-light;
      }
    }

    &_Separator {
      margin: 5px 12px;
      border: none;
      height: 1px;
      background: linear-gradient(to right, rgba(30,87,153,0) 0%,rgba(255,255,255,1) 1%,rgba(125,185,232,0) 100%);
    }
  }


</style>
