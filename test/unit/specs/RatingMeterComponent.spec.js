import Vue from 'vue'
import RatingMeterComponent from '@/components/Shared/RatingMeterComponent.vue'
let vm

describe('RatingMeterComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(RatingMeterComponent)
    vm = new Ctor().$mount()
  })

  it('should validate the value prop correctly', () => {
    let valid = vm.$options.props.value.validator(10)
    expect(valid).to.equal(true)

    valid = vm.$options.props.value.validator(1000)
    expect(valid).to.equal(false)

    valid = vm.$options.props.value.validator(-50)
    expect(valid).to.equal(false)
  })
})
