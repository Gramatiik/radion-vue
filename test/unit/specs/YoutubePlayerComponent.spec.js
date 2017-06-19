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

  it('should have first video as current video index', () => {
    expect(vm.currentVideoIndex).to.equal(0)
  })

  it('should still have first video as currentVideoIndex after calling previousVideo()', () => {
    vm.previousVideo()
    expect(vm.currentVideoIndex).to.equal(0)
  })

  it('should have second video as currentVideoIndex after calling nextVideo()', () => {
    vm.nextVideo()
    expect(vm.currentVideoIndex).to.equal(1)
  })
})
