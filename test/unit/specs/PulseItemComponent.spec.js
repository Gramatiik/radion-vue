import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueLazyBackgroundImage from 'vue-lazy-background-images/VueLazyBackgroundImage.vue'
import PulseItemComponent from '@/components/Pulses/PulseItemComponent.vue'
let vm

describe('PulseItemComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    Vue.use(VueMoment)
    Vue.component('lazy-background', VueLazyBackgroundImage)
    const Ctor = Vue.extend(PulseItemComponent)
    const store = { state: { igdb: { pulseSourcesList: [] } } }
    const propsData = {
      pulseData: {
        image: 'test_news_image',
        title: 'TEST_TITLE',
        url: 'test_news_link',
        pulse_source: 18,
        published_at: 1498051889000
      }
    }
    vm = new Ctor({ propsData, store }).$mount()
  })

  it('should return the pulse image url in computed property', () => {
    expect(vm.pulseImage).to.equal('test_news_image')
  })

  it('should return the publish date in computed property', () => {
    expect(vm.released).to.be.a('string')
  })

  it('should render a title', () => {
    expect(vm.$el.querySelector('.pulse-card .pulse-content h3').textContent.trim()).to.equal('TEST_TITLE')
  })

  it('should render a correct link', () => {
    expect(vm.$el.getAttribute('href').trim()).to.equal('test_news_link')
  })
})
