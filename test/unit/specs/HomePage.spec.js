import Vue from 'vue'
import router from '../../../src/router'
import HomePage from '@/components/HomePage.vue'
let vm

describe('HomePage.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(HomePage)
    vm = new Ctor({ router }).$mount()
  })

  it('should render a correct link', done => {
    vm.links = [{ name: 'Test', classes: [ 'test-class-1', 'test-class-2' ], route: { name: 'GamesDefault' } }]
    Vue.nextTick(() => {
      let elements = vm.$el.querySelectorAll('.HomePage_Links_Item')
      expect(elements.length).to.equal(1)
      expect(elements[0].getAttribute('class')).to.equal('HomePage_Links_Item test-class-1 test-class-2')
      expect(elements[0].textContent.trim()).to.equal('Test')
      done()
    })
  })

  it('should have a valid object for each link', () => {
    let hasValidStructure = true
    for (let link of vm.links) {
      if (!(link.name && link.classes && link.route)) hasValidStructure = false
    }
    expect(hasValidStructure).to.equal(true)
  })
})
