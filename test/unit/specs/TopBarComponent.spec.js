import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../../src/router'
import TopBarComponent from '@/components/Shared/TopBarComponent.vue'
let vm

/**
 * Create a mock store with only what this component needs
 * @returns {Store}
 */
function createMockStore () {
  return new Vuex.Store({
    state: {
      menuOpened: false
    },
    mutations: {
      'MENU_TOGGLE': sinon.stub()
    }
  })
}

describe('TopBarComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(TopBarComponent)
    const store = createMockStore()
    vm = new Ctor({ store, router }).$mount()
  })

  it('should have valid menu items after initialization', () => {
    expect(vm.menuItems).to.be.an('array')
    let hasValidStructure = true
    for (let menuItem of vm.menuItems) {
      if (!(menuItem.title && menuItem.icon && menuItem.route)) hasValidStructure = false
    }
    expect(hasValidStructure).to.equal(true)
  })
})
