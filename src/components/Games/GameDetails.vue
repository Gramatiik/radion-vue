<template>
  <div>
    <pre>{{ gameDetails }}</pre>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'game-details',
    props: [ 'slug' ],
    methods: {},
    computed: {
      ...mapState({
        gameDetails: state => state.gamesModule.gameDetails
      })
    },
    created () {
      this.$store.dispatch('getGameBySlug', this.slug)
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
