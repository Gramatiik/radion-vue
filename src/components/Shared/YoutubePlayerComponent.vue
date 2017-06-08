<template>
    <div class="YoutubePlayerComponent">
      <youtube class="YoutubePlayerComponent_Player" player-width="100%" player-height="350" :video-id="currentVideo"></youtube>
      <div class="YoutubePlayerComponent_Controls">
        <button @click="previousVideo" :disabled="!hasPrevious" class="YoutubePlayerComponent_Controls_Control button">Previous</button>
        <span>{{ currentVideoIndex + 1 }}/{{ videoCount }}</span>
        <button @click="nextVideo" :disabled="!hasNext" class="YoutubePlayerComponent_Controls_Control button">Next</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'youtube-player-component',
    props: {
      video_ids: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        currentVideoIndex: 0
      }
    },
    computed: {
      videoCount () {
        return this.video_ids.length
      },
      currentVideo () {
        return this.video_ids[this.currentVideoIndex]
      },
      hasNext () {
        return this.currentVideoIndex < this.videoCount - 1
      },
      hasPrevious () {
        return this.currentVideoIndex > 0
      }
    },
    methods: {
      previousVideo () {
        if (this.hasPrevious) {
          this.currentVideoIndex--
        }
      },
      nextVideo () {
        if (this.hasNext) {
          this.currentVideoIndex++
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .YoutubePlayerComponent {

      &_Player {

      }

      &_Controls {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        &_Control {
          width: 100px;
        }
      }

    }
</style>
