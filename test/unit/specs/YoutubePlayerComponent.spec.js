import Vue from 'vue'
import VueYoutube from 'vue-youtube-embed'
import YoutubePlayerComponent from '@/components/Shared/YoutubePlayerComponent.vue'
let vm

describe('YoutubePlayerComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    Vue.use(VueYoutube)
    const Ctor = Vue.extend(YoutubePlayerComponent)
    const propsData = {
      video_ids: [ '88XU5Oi2mgE', '22WZtbPn0Fc', '8KaEZ0by6rM' ]
    }
    vm = new Ctor({ propsData }).$mount()
  })

  it('should have 3 videos after initialization', () => {
    expect(vm.video_ids.length).to.equal(3)
    expect(vm.videoCount).to.equal(3)
  })

  it('should have first video as current video index after initialization', () => {
    expect(vm.currentVideoIndex).to.equal(0)
  })

  it('should navigate correctly in videos list', () => {
    vm.nextVideo()
    expect(vm.currentVideoIndex).to.equal(1)

    vm.previousVideo()
    expect(vm.currentVideoIndex).to.equal(0)

    vm.previousVideo()
    expect(vm.currentVideoIndex).to.equal(0)

    vm.nextVideo()
    vm.nextVideo()
    expect(vm.currentVideoIndex).to.equal(2)

    vm.nextVideo()
    expect(vm.currentVideoIndex).to.equal(2)
  })
})
