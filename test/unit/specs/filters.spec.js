import Vue from 'vue'
import router from '@/router'
import HomePage from '@/components/HomePage.vue'
let vm

describe('filters/index.js', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    const Ctor = Vue.extend(HomePage)
    vm = new Ctor({ router }).$mount()
  })

  describe('Cloudinary Filter', () => {
    it('should generate the right link to image', () => {
      expect(vm.$options.filters.cloudinary('XXXXXXXXXX', 'cover_small')).to.equal('https://images.igdb.com/igdb/image/upload/t_cover_small/XXXXXXXXXX.jpg')
      expect(vm.$options.filters.cloudinary('XXXXXXXXXX', 'original')).to.equal('https://images.igdb.com/igdb/image/upload/XXXXXXXXXX.jpg')
    })
  })

  describe('Capitalize Filter', () => {
    it('should Capitalize the word correctly', () => {
      expect(vm.$options.filters.capitalize('capitalize')).to.equal('Capitalize')
      expect(vm.$options.filters.capitalize('00TEST')).to.equal('00TEST')
      expect(vm.$options.filters.capitalize('AlreadyCapitalized')).to.equal('AlreadyCapitalized')
      expect(vm.$options.filters.capitalize('~TOSTESTAS')).to.equal('~TOSTESTAS')
    })
  })
})
