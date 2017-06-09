<template>
    <div class="PlatformsPage">
      <h1>Platforms</h1>

      <modal-component :isVisible="showDetails" :onClose="closeDetails">
        <h2 slot="title">SLIP</h2>
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto eligendi magnam modi molestias officiis porro praesentium.</p>
      </modal-component>

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
  import ListLoaderComponent from '@/components/Shared/ListLoaderComponent'
  import ModalComponent from '@/components/Shared/ModalComponent'
  import PlatformItemComponent from '@/components/Platforms/PlatformItemComponent'
  import store from '@/store/'

  export default {
    name: 'platforms-page',
    components: {
      PlatformItemComponent,
      ListLoaderComponent,
      ModalComponent
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
        this.showDetails = false
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
