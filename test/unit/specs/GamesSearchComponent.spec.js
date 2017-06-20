import Vue from 'vue'
import Vuex from 'vuex'
import GamesSearchComponent from '@/components/Games/GamesSearchComponent.vue'
let vm

describe('GamesSearchComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(GamesSearchComponent)
    const store = new Vuex.Store({
      mutations: {
        MENU_TOGGLE: sinon.stub()
      }
    })
    vm = new Ctor({ store }).$mount()
  })

  it('should have a button that says "Go"', () => {
    expect(vm.$el.querySelector('button.GamesSearchComponent_Form_Submit').textContent).to.equal('Go')
  })

  it('should have an empty text input with a placeholder saying "Search for games..."', () => {
    let inputElement = vm.$el.querySelector('input.GamesSearchComponent_Form_Input')
    expect(inputElement.textContent).to.be.empty
    expect(inputElement.getAttribute('placeholder')).to.equal('Search for games...')
  })
})
