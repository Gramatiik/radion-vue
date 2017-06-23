<template>
  <div class="PlatformItemComponent">
    <div class="PlatformItemComponent_Logo" :style="{ backgroundImage: cardThumb }"></div>
    <div class="PlatformItemComponent_Infos">
      <h3 class="PlatformItemComponent_Name">{{ platform.name }}</h3>
      <span class="PlatformItemComponent_ReleaseDate">Released {{ new Date() | moment("YYYY") }}</span>
      <span class="PlatformItemComponent_GamesCount">{{ platform.games.length || 0 }} games</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'platform-item-component',
    props: [ 'platform' ],
    computed: {
      cardThumb () {
        return `url("${this.$options.filters.cloudinary(this.platform.logo.cloudinary_id, 'thumb')}")`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .PlatformItemComponent {
    position: relative;
    display: block;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 90px;
    background-color: $bg-light;
    box-shadow: 0 5px 10px $bg-dark;
    transition: transform .2s ease-out;

    &:hover {
      transform: scale(1.02);
    }

    &_Logo {
      float: left;
      width: 90px;
      height: 90px;
      background-size: contain;
      margin-right: 10px;
      box-shadow: 1px 1px 5px $bg-dark;
    }

    &_Name {
      margin-top: 5px;
      font-size: 1.4rem;
    }

    &_GamesCount {
      position: absolute;
      top: -12px;
      right: -5px;
      border-radius: 20px;
      padding: 2px 4px;
      background-color: $primary;
      color: $font-light;
      font-size: .9rem;
    }
  }
</style>
