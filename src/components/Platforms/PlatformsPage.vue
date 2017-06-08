<template>
    <div class="PlatformsPage">
      <h1>Platforms</h1>

      <div v-if="!apiFailure">
        <div class="CardLayout">
          <platform-item-component
            class="CardLayout_Item"
            v-for="(platform, index) in platforms"
            :key="platform.id"
            :platform="platform"
            @click.native="presentDetails(index)">
          </platform-item-component>
        </div>
        <list-loader-component v-if="platformsCount < platformsTotalCount" :loading="listLoading" :load-more="loadMore"></list-loader-component>
      </div>
      <div v-else style="text-align: center">
        Unable to load platforms...
        <button @click="retry">Try again ?</button>
      </div>

    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { API_FAILURE, CLEAR_PLATFORMS } from '@/store/mutation-types'
  import Modal from 'modal-vue'
  import ListLoaderComponent from '@/components/Shared/ListLoaderComponent'
  import PlatformItemComponent from '@/components/Platforms/PlatformItemComponent'
  import store from '@/store/'

  export default {
    name: 'platforms-page',
    components: {
      PlatformItemComponent,
      ListLoaderComponent,
      Modal
    },
    data () {
      return {
        currentPlatformIndex: 0,
        showDetails: false
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.igdb.platforms,
        listLoading: state => state.listLoading,
        apiFailure: state => state.apiFailure
      }),
      ...mapGetters(['platformsCount', 'platformsTotalCount'])
    },
    methods: {
      presentDetails (index) {
        this.showDetails = true
      },
      closeDetails () {
        this.showModal = false
      },
      dispatchPlatformsAction () {
        this.$store.dispatch('getPlatforms', this.platformsCount)
      },
      retry () {
        this.$store.commmit(API_FAILURE, false)
        this.dispatchPlatformsAction()
      },
      loadMore () {
        this.dispatchPlatformsAction()
      }
    },
    beforeRouteEnter (to, from, next) {
      getPlatforms(next)
    },
    beforeRouteUpdate (to, from, next) {
      getPlatforms(next)
    }
  }

  function getPlatforms (next) {
    store.commit(CLEAR_PLATFORMS)

    store.dispatch('getPlatforms')
      .then(() => next())
  }
</script>
