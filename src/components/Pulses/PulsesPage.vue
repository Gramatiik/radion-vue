<template>
  <div>
    <h1 class="page-title">Latest Pulses</h1>

    <div v-if="!apiFailure">
      <div class="pulses-container grid-3-small-2 has-gutter-l">
        <pulse-item-component  v-for="item in pulses" :key="item.id" :pulse-data="item"></pulse-item-component>
      </div>
      <list-loader-component :loading="listLoading" :load-more="loadMore"></list-loader-component>
    </div>
    <div v-else style="text-align: center">
      Unable to retrieve pulses from API...
      <button @click="retry">Retry ?</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_PULSES } from '@/store/mutation-types'
  import PulseItemComponent from '@/components/Pulses/PulseItemComponent'
  import ListLoaderComponent from '@/components/Shared/ListLoaderComponent'
  import store from '@/store/'
  export default {
    name: 'pulses',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        pulses: state => state.igdb.pulses,
        listLoading: state => state.listLoading,
        apiFailure: state => state.apiFailure
      }),
      ...mapGetters(['pulsesCount'])
    },
    methods: {
      loadMore () {
        // load more data
        this.$store.dispatch('getLatestPulses', this.pulsesCount)
      },
      retry () {
        this.$store.commit(API_FAILURE, false)
        this.$store.dispatch('getLatestPulses', this.pulsesCount)
      }
    },
    beforeRouteEnter (to, from, next) {
      loadPulses(next)
    },
    components: {
      PulseItemComponent,
      ListLoaderComponent
    }
  }

  function loadPulses (next) {
    store.commit(CLEAR_PULSES)
    store.dispatch('getLatestPulses', store.getters.pulsesCount)
      .then(() => next())
  }
</script>
