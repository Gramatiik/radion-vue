<template>
  <transition mode="out-in" name="slide-fade" duration="5000">
    <div>
      <pin-platforms class="game-platforms" :platform-ids="platformIds"></pin-platforms>
      <pre>{{ gameDetails }}</pre>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '@/store/'
  import PinPlatforms from '@/components/PinPlatforms/PinPlatforms'
  export default {
    name: 'game-details',
    props: [ 'slug' ],
    methods: {},
    computed: {
      ...mapState({
        gameDetails: state => state.igdb.gameDetails
      }),
      platformIds: function () {
        let platformIds = []
        for (let release of this.gameDetails['release_dates'] || {}) {
          platformIds.push(release.platform)
        }
        return platformIds
      }
    },
    components: {
      PinPlatforms
    },
    beforeRouteEnter (to, from, next) {
      getGameDetails(to, next)
    },
    beforeRouteUpdate (to, from, next) {
      getGameDetails(to, next)
    }
  }

  function getGameDetails (to, next) {
    store.dispatch('getGameBySlug', to.params.slug)
      .then(() => next())
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
