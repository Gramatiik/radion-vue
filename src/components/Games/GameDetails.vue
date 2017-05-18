<template>
  <transition mode="out-in" name="bottom-push">
    <div>
      <pre>{{ gameDetails }}</pre>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '@/store/'
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
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
