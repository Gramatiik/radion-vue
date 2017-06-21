import Vue from 'vue'
import SimpleGalleryComponent from '@/components/Shared/SimpleGalleryComponent.vue'
let vm

describe('SimpleGalleryComponent.vue', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(SimpleGalleryComponent)
    const propsData = {
      images: [
        {
          big: 'image1-big',
          thumb: 'image1-thumb'
        },
        {
          big: 'image2-big',
          thumb: 'image2-thumb'
        }
      ]
    }
    vm = new Ctor({ propsData }).$mount()
  })

  it('should validate the props correctly', () => {
    expect(vm.$options.props.images.validator([{ big: 'BIG', thumb: 'THUMB' }])).to.equal(true)
    expect(vm.$options.props.images.validator([{ thumb: 'THUMB' }])).to.equal(false)
  })

  it('should have the correct number of images in computed property', () => {
    expect(vm.imagesCount).to.equal(2)
  })

  it('should be able to change the current selected image', () => {
    vm.setCurrent(0)
    expect(vm.current).to.equal(0)

    vm.setCurrent(1)
    expect(vm.current).to.equal(1)
  })

  it('should be able to determine if an index is the current index', () => {
    vm.setCurrent(0)
    expect(vm.isCurrent(0)).to.equal(true)
    expect(vm.isCurrent(1)).to.equal(false)
  })
})
