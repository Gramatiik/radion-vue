<template>
  <div>
    <router-link :to="{ name: 'Games' }">Go to Games</router-link>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        msg: 'Sample of users'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
