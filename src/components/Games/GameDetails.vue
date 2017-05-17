<template>
  <div>
    <pre>{{ gameDetails }}</pre>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '../../store/index'
  export default {
    name: 'game-details',
    props: [ 'slug' ],
    methods: {},
    computed: {
      ...mapState({
        gameDetails: state => state.igdb.gameDetails
      })
    },
    beforeRouteEnter (to, from, next) {
      store.dispatch('getGameBySlug', to.params.slug)
        .then(() => next())
    },
    beforeRouteUpdate (to, from, next) {
      store.dispatch('getGameBySlug', to.params.slug)
        .then(() => next())
    },
    created () {
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
