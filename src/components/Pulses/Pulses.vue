<template>

  <div>
    <h1 class="page-title">Latest Pulses</h1>

    <div v-if="!apiFailure">
      <div class="pulses-container">
        <pulse-item class="card-item" v-for="item in pulses" :key="item.id" :pulse-data="item"></pulse-item>
      </div>
      <button @click="loadMore">Load More</button>
    </div>
    <div v-else style="text-align: center">
      Unable to retrieve pulses from API...
      <button @click="retry">Retry ?</button>
    </div>

    <div class="spinner" v-if="listLoading && !apiFailure">
      <div class="double-bounce double-bounce-1"></div>
      <div class="double-bounce double-bounce-2"></div>
    </div>

  </div>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_PULSES } from '@/store/mutation-types'
  import PulseItem from '@/components/Pulses/PulseItem'
  export default {
    name: 'pulses',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        pulses: state => state.pulsesModule.pulses,
        listLoading: state => state.listLoading,
        apiFailure: state => state.apiFailure
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
      },
      retry () {
        this.$store.commit(API_FAILURE, false)
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
