<template>
    <div class="DiscoverPage">
      <h1>Discover <span class="Icon Icon-small Icon-Info" @click="infosVisible = true"></span></h1>

      <modal-component :is-visible="infosVisible" :on-close="closeInfos">
        <div slot="title" class="PlatformDetailsComponent_Title">What is Discover ?</div>
        <div slot="body" class="PlatformDetailsComponent_Body">
          <p>Discover page present you games you might like.</p>
          <p>
            <strong>Thumbs up</strong> a game to add it to your favourites, or <strong>thumbs down</strong> to ignore it.<br>
            You have <strong>10 discovers</strong> each day, represented by your <strong>life count</strong>.
          </p>
          <p>Go ahead and discover awesome games !</p>
        </div>
        <div slot="actions">
          <button class="Button Button-small" @click="closeInfos">Close</button>
        </div>
      </modal-component>

      <transition mode="out-in" name="slide-fade">
        <div class="DiscoverPage_Content" v-if="currentGame">

          <div class="GameCard">
            <div class="GameCard_Background" :style="{ backgroundImage: currentGame.cover ? 'url(\'' + currentGame.cover.url + '\')' : ''}">
            </div>
            <img class="GameCard_Cover" :src="gameCoverImage" alt="Cover">
            <h2 class="GameCard_Title">{{ currentGame.name }}</h2>
            <span class="GameCard_ReleaseDate" v-if="currentGame.first_release_date">Released on {{ new Date(currentGame.first_release_date) | moment("MMMM D, YYYY") }}</span>
            <pin-platforms-component class="GameCard_Platforms" :platform-ids="platformIds" :pin-size="1.2"></pin-platforms-component>
          </div>

          <div class="DiscoverPage_Thumbs">
            <div class="DiscoverPage_Thumbs_Dislike" @click="dislike">
              <span class="Icon Icon-ThumbDown"></span>
            </div>

            <div class="DiscoverPage_Thumbs_Like" @click="like">
              <span class="Icon Icon-ThumbUp"></span>
            </div>
          </div>

          <life-counter-component class="DiscoverPage_LifeCount" :max="10" :count="lifeCount"></life-counter-component>
        </div>
      </transition>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { ADD_FAVOURITE_GAME } from '@/store/mutation-types'
  import LifeCounterComponent from '@/components/Discover/LifeCounterComponent'
  import PinPlatformsComponent from '@/components/PinPlatforms/PinPlatformsComponent'
  import ModalComponent from '@/components/Shared/ModalComponent'
  export default {
    name: 'discover-page',
    components: {
      LifeCounterComponent,
      PinPlatformsComponent,
      ModalComponent
    },
    data () {
      return {
        lifeCount: 10,
        infosVisible: false
      }
    },
    computed: {
      ...mapState({
        currentGame: state => state.igdb.currentDiscoverGame,
        loading: state => state.loading
      }),
      platformIds () {
        let platformIds = []
        for (let release of this.currentGame['release_dates'] || []) {
          platformIds.push(release.platform)
        }
        return platformIds
      },
      gameCoverImage () {
        return this.$options.filters.cloudinary(this.currentGame.cover, 'cover_small')
      }
    },
    methods: {
      ...mapMutations({ ADD_FAVOURITE_GAME }),
      closeInfos () {
        this.infosVisible = false
      },
      getNextGame () {
        this.$store.dispatch('getRandomGame', { total: this.$store.state.igdb.gamesCount, excluded: this.$store.state.igdb.excludedDiscoverGames })
      },
      like () {
        if (this.lifeCount > 0) {
          this.lifeCount--
        }
        // add this game to favourites
        this.ADD_FAVOURITE_GAME(this.currentGame)

        // get the next game
        this.getNextGame()
      },
      dislike () {
        if (this.lifeCount > 0) {
          this.lifeCount--
        }
        this.getNextGame()
      }
    },
    mounted () {
      // wait a little for vuex state being available
      // FIXME : any better way to achieve this ?
      setTimeout(() => {
        this.getNextGame()
      }, 500)
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .DiscoverPage {
    padding-top: 12px;

    &_LifeCount {
      margin-bottom: 12px;
    }

    &_Infos {
      border: none;
      background-color: $accent;
      display: block;
      width: 100%;
      outline: none;
      color: $font-light;
    }

    &_Thumbs {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      &_Like, &_Dislike {
        cursor: pointer;
        position: relative;
        height: 60px;
        width: 60px;
        display: inline-block;
        box-sizing: inherit;
        border-radius: 50%;
        background-color: $primary;

        .Icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .GameCard {
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    padding: 8px 8px 50px;
    min-height: 400px;

    &_Cover {
      display: block;
      background: $font-light center;
      box-shadow: 2px 2px 12px rgba(#000, .9);
      object-fit: contain;
      min-width: 90px;
      min-height: 90px;
      max-width: 200px;
      max-height: 200px;
      margin: 0 auto;
    }

    &_Title {
      text-align: center;
      line-height: 3.3rem;
      font-size: 3.5rem;
      color: $font-light;
      text-shadow: 2px 2px 5px #000;
      margin-top: 20px;
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

    &_Background {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.1);
      filter: blur(5px);
      z-index: -1;
    }
  }
</style>
