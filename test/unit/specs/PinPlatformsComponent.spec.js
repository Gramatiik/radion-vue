import Vue from 'vue'
import Vuex from 'vuex'
// import store from '../../../src/store'
import PinPlatformsComponent from '@/components/PinPlatforms/PinPlatformsComponent.vue'

let vm

import platformList from '../data/platformList.json'

/**
 * Create a mock store with only what this component needs
 * @returns {Store}
 */
function createMockStore () {
  return new Vuex.Store({
    modules: {
      igdb: {
        state: {
          // here we load our data file to our mocked state
          platformsList: platformList
        }
      }
    }
  })
}

describe('PinPlatformsComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(PinPlatformsComponent)
    const propsData = {
      platformIds: [12, 72, 100, 12]
    }
    const store = createMockStore()
    vm = new Ctor({ propsData, store }).$mount()
  })

  /**
   * Test the compoment initialization
   */
  it('should initialize properly', () => {
    expect(PinPlatformsComponent.created).to.be.a('function')
    expect(vm.pins).to.be.an('array')
    expect(vm.pins.length).to.equal(3)

    expect(vm.pins[1].name).to.equal('Ouya')
  })

  /**
   * Test the computed uniquePlatform Ids
   */
  it('should filter unique platforms ids in computed property', () => {
    expect(vm.uniquePlatformIds).to.deep.equal([12, 72, 100])
  })
})
