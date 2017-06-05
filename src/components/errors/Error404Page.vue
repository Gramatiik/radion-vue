<template>
  <div class="Error404Page">
    <h1 class="Error404Page_BigNumber">4Ø4</h1>
    <p class="Error404Page_Notice">Woops, looks like you went too far</p>
  </div>
</template>

<script>
  export default {
    name: 'error-404-page'
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .Error404Page {

    &_BigNumber {
      font-size: 30vw;
      color: $accent;
      text-shadow: 0 5px 10px $bg-dark;
    }

    &_Notice {
      text-align: right;
      font-weight: bold;
      color: $primary;
      text-shadow: 0 2px 5px $bg-dark;
      font-size: 3rem;
      margin: 0;
    }
  }
</style>
