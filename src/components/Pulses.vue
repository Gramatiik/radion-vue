<template>
  <div>
    <h1 class="page-title">Pulses</h1>

    <div class="pulses-container"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="false"
         infinite-scroll-distance="3">
      <pulse-item class="card-item" v-for="item in pulses" :key="item.id" :pulse-data="item"></pulse-item>
    </div>

    <div class="spinner" v-if="listLoading">
      <div class="double-bounce double-bounce-1"></div>
      <div class="double-bounce double-bounce-2"></div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { CLEAR_PULSES } from '@/store/mutation-types'
  import PulseItem from '@/components/PulseItem'
  export default {
    name: 'pulses',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        pulses: state => state.pulsesModule.pulses,
        listLoading: state => state.listLoading
      }),
      ...mapGetters(['pulsesCount'])
    },
    methods: {
      loadPulses () {
        // clear saved games at component startup
        this.$store.commit(CLEAR_PULSES)

        // load initial data
        this.$store.dispatch('getLatestPulses', this.pulsesCount)
      },
      loadMore () {
        // load more data
        this.$store.dispatch('getLatestPulses', this.pulsesCount)
      }
    },
    created () {
      this.loadPulses()
    },
    components: {
      PulseItem
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .pulses-container {
    @include responsiveCardLayout($card-layout-gutter);
  }
</style>
