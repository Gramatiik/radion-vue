<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="$store.dispatch('getGames')">GET DATA</button>
    <div>
      <div v-for="game in recentGames">{{ game.name }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Sample of users'
      }
    },
    computed: {
      ...mapGetters(['recentGames'])
    },
    created () {
      this.$store.dispatch('getGames')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
