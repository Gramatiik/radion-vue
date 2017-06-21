import Vue from 'vue'
import ModalComponent from '@/components/Shared/ModalComponent.vue'
let vm
let closeSpy = sinon.spy()

describe('ModalComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(ModalComponent)
    let propsData = {
      isVisible: false,
      onClose: closeSpy
    }
    vm = new Ctor({ propsData }).$mount()
  })

  it('should have mounted and beforeDestroy hooks', () => {
    expect(ModalComponent.mounted).to.be.a('function')
    expect(ModalComponent.beforeDestroy).to.be.a('function')
    vm.$destroy()
  })

  it('should call onClose if ESC key was pressed and modal is visible', () => {
    // prepare modal
    vm.isVisible = true
    let e = { keyCode: 27 }

    // call spied method
    vm.closeWithEsc(e)

    // final assertion
    expect(closeSpy).to.have.been.called
  })
})
