<template>
  <div>
    <router-link :to="{ name: 'About' }">
      <span>{{ gameData.name }}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'game-item',
    props: [ 'gameData' ],
    methods: {}
  }
</script>

<style scoped lang="scss">

</style>
