<template>
  <div class="GameDetailsPage">
    <div class="GameDetailsPage_Header">

      <img class="GameDetailsPage_Header_Cover" :src="gameCoverImage" alt="Cover">

      <h1 class="GameDetailsPage_Header_Name">{{ gameDetails.name }}</h1>

      <span class="GameDetailsPage_Header_ReleaseDate">Released on {{ new Date(gameDetails.first_release_date) | moment("MMMM D, YYYY") }}</span>

      <lazy-background
        class="GameDetailsPage_Header_Background"
        :image-source="gameCoverBackgroundImage"
        :loading-image="require('@/assets/images/pulse-no-image.png')"
        :error-image="require('@/assets/images/pulse-no-image.png')">
      </lazy-background>
    </div>

    <rating-meter-component v-if="gameDetails.aggregated_rating" :value="gameDetails.aggregated_rating"></rating-meter-component>

    <pin-platforms-component class="GameDetailsPage_Platforms" :platform-ids="platformIds" :pin-size="1.2"></pin-platforms-component>

    <div class="GameDetailsPage_Share">
      <h3 class="GameDetailsPage_Share_Title">Share</h3>
      <social-sharing inline-template class="GameDetailsPage_Share_Links ShareGroup">
        <div>
          <network class="ShareGroup_Link ShareGroup_Link-facebook" network="facebook">Facebook</network>
          <network class="ShareGroup_Link ShareGroup_Link-googleplus" network="googleplus">Google +</network>
          <network class="ShareGroup_Link ShareGroup_Link-twitter" network="twitter">Twitter</network>
        </div>
      </social-sharing>
    </div>


    <div class="GameDetailsPage_Section" v-if="gameDetails.summary">
      <h2 class="GameDetailsPage_Section_Title">Summary</h2>
      <p class="GameDetailsPage_Section_Content" v-html="gameDetails.summary"></p>
    </div>

    <div class="GameDetailsPage_Section" v-if="gameDetails.storyline">
      <h2 class="GameDetailsPage_Section_Title">Storyline</h2>
      <p class="GameDetailsPage_Section_Content" v-html="gameDetails.storyline"></p>
    </div>

    <div class="GameDetailsPage_Section" v-if="gameDetails.screenshots">
      <h2 class="GameDetailsPage_Section_Title">Screenshots ({{ gameDetails.screenshots.length }})</h2>
      <simple-gallery-component class="GameDetailsPage_Section_Content" :images="screenshotImages"></simple-gallery-component>
    </div>

    <div class="GameDetailsPage_Section" v-if="gameDetails.videos">
      <h2 class="GameDetailsPage_Section_Title">Videos ({{ gameDetails.videos.length }})</h2>
      <youtube-player-component class="GameDetailsPage_Section_Content" :video_ids="videoIds"></youtube-player-component>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '@/store/'
  import PinPlatformsComponent from '@/components/PinPlatforms/PinPlatformsComponent'
  import RatingMeterComponent from '@/components/Shared/RatingMeterComponent'
  import SimpleGalleryComponent from '@/components/Shared/SimpleGalleryComponent'
  import YoutubePlayerComponent from '@/components/Shared/YoutubePlayerComponent'
  export default {
    name: 'game-details-page',
    props: [ 'slug' ],
    components: {
      PinPlatformsComponent,
      RatingMeterComponent,
      SimpleGalleryComponent,
      YoutubePlayerComponent
    },
    computed: {
      ...mapState({
        gameDetails: state => state.igdb.gameDetails
      }),
      platformIds () {
        let platformIds = []
        for (let release of this.gameDetails['release_dates'] || {}) {
          platformIds.push(release.platform)
        }
        return platformIds
      },
      gameCoverBackgroundImage () {
        return this.gameDetails.cover ? this.gameDetails.cover.url : require('@/assets/images/pulse-no-image.png')
      },
      gameCoverImage () {
        return this.$options.filters.cloudinary(this.gameDetails.cover, 'cover_small')
      },
      screenshotImages () {
        let images = []
        for (let screenshot of this.gameDetails.screenshots || []) {
          images.push({
            thumb: this.$options.filters.cloudinary(screenshot, 'cover_small'),
            big: this.$options.filters.cloudinary(screenshot, 'screenshot_big')
          })
        }
        return images
      },
      videoIds: function () {
        let ids = []
        for (let video of this.gameDetails.videos || []) {
          ids.push(video.video_id)
        }
        return ids
      }
    },
    beforeRouteEnter (to, from, next) {
      getGameDetails(to, next)
    },
    beforeRouteUpdate (to, from, next) {
      getGameDetails(to, next)
    },
    mounted () {
      scrollTo(0, 0)
    }
  }

  function getGameDetails (to, next) {
    store.dispatch('getGameBySlug', to.params.slug)
      .then(() => next())
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .GameDetailsPage {
    margin-bottom: 20px;

    &_Header {
      position: relative;
      display: flex;
      flex-flow: column;
      justify-content: center;
      min-height: 350px;
      background-size: cover;
      overflow: hidden;
      padding: 10px 5px 1.8rem;

      &_Cover, &_Background {
        background: $font-light center;
      }

      &_Cover {
        box-shadow: 2px 2px 12px rgba(#000, .9);
        object-fit: contain;
        min-width: 90px;
        min-height: 90px;
        max-width: 200px;
        max-height: 200px;
        margin: 0 auto;
      }

      &_Background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(15px);
        transform: scale(1.2);
        z-index: -1;
      }

      &_Name {
        text-align: center;
        line-height: 3.3rem;
        font-size: 3.5rem;
        color: $font-light;
        text-shadow: 2px 2px 5px #000;
        margin: 25px 20px 40px;
        word-wrap: break-word;
      }

      &_ReleaseDate {
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding: 5px;
        background-color: rgba(#000, .4);
        font-size: 1.4rem;
        color: $accent;
      }

    }

    &_Share {
      margin-bottom: 12px;

      &_Links {
        display: inline-block;
      }
    }

    &_Platforms {
      margin-top: 5px;
    }
  }
</style>
