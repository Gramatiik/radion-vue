<template>
  <div class="PinsPlatformsComponent" :style="{ textAlign: alignment }">
    <span v-for="pin in pins"
          class="PinsPlatformsComponent_Item"
          :style="{ backgroundColor: pin.primary, borderColor: pin.border, fontSize: pinSize + 'rem'}">{{ pin.name }}</span>
  </div>
</template>

<script>
  import mapping from './pin-styles.json'
  import { mapState } from 'vuex'
  export default {
    name: 'pin-platforms',
    props: {
      platformIds: {
        type: Array,
        required: true
      },
      pinSize: {
        type: Number,
        required: false,
        default: 0.8
      },
      alignment: {
        type: String,
        required: false,
        default: 'right'
      }
    },
    data () {
      return {
        pins: [],
        defaultStyle: {
          name: '',
          primary: '',
          border: ''
        }
      }
    },
    computed: {
      ...mapState({
        platformsList: state => state.igdb.platformsList
      }),
      uniquePlatformIds: function () {
        return this.platformIds.filter((elem, index, self) => {
          return index === self.indexOf(elem)
        })
      }
    },
    methods: {
      makePins () {
        for (let id of this.uniquePlatformIds) {
          // load platform name by id (should be loaded in state at this point)
          let platformParams = mapping[this.platformsList[id]] || {
            name: this.platformsList[id],
            primary: '#414345',
            border: '#888888'
          }

          this.pins.push(platformParams)
        }
      }
    },
    created () {
      this.makePins()
    }
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .PinsPlatformsComponent {
    color: $font-light;
    margin-bottom: -5px;

    &_Item {
      min-width: 22px;
      padding: 1px 3px;
      margin-left: 5px;
      margin-bottom: 5px;
      border-radius: 5px;
      border: 1px solid;
      display: inline-block;
      font-size: .8rem;
      text-align: center;
    }
  }
</style>
