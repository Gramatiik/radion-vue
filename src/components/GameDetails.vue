<template>
  <div>
    <button @click="$router.go(-1)">Return to list</button>
  </div>
</template>

<script>
  export default {
    name: 'game-details',
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
