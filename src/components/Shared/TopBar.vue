<template>
  <div class="top-menu">
    <div class="burger-menu" @click="MENU_TOGGLE" :class="{ opened: menuOpened }">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="brand-icon"></div>
    <div class="brand-name">Radion</div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { MENU_TOGGLE } from '@/store/mutation-types'
  export default {
    name: 'top-bar',
    data () {
      return {}
    },
    methods: {
      ...mapMutations([ MENU_TOGGLE ])
    },
    computed: mapState([ 'menuOpened' ])
  }
</script>

<style scoped lang="scss">
  @import "variables";

  div.top-menu {
    position: fixed;
    top: 0;
    z-index: 10000;
    background-color: $primary;
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

    .brand-icon {
      position: absolute;
      top: 5px;
      left: 70px;
      width: 40px;
      height: 40px;
      background-image: url("../assets/images/radion-logo.png");
      background-size: contain;
    }

    .brand-name {
      position: absolute;
      top: 6px;
      left: 120px;
      font-size: 28px;
      font-weight: bold;
      color: $font-light;
    }

    .burger-menu {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 28px;
      margin-left: 10px;
      margin-top: 11px;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;

      span{
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: $font-light;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;

        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(2), &:nth-child(3) {
          top: 12px;
        }
        &:nth-child(4) {
          top: 24px;
        }
      }

      &.opened {
        span {
          &:nth-child(1) {
            top: 12px;
            width: 0;
            left: 50%;
          }
          &:nth-child(2) {
            transform: rotate(45deg);
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
          }
          &:nth-child(4) {
            top: 12px;
            width: 0;
            left: 50%;
          }
        }
      }
    }
  }
</style>
