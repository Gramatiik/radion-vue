<template>
  <div @click="addKey">
    Click me
  </div>
</template>

<script>
  export default {
    name: 'pin-platforms',
    props: [ 'ids' ],
    data () {
      return {
        value: 'SLIP'
      }
    },
    methods: {
      addKey () {
        localStorage.setItem('TEST', this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
