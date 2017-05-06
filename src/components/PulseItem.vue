<template>
  <div class="pulse-card">
    <div class="pulse-infos">
      <h3>{{ pulseData.title }}</h3>
      <span class="release-date">Released {{ new Date(pulseData.created_at) | moment("from") }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pulse-item',
    props: [ 'pulseData' ],
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "variables";
</style>
