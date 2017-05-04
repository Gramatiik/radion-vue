<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>
      <router-link :to="{ name: 'About' }">Go to Homepage</router-link>
    </div>
    <game-item v-for="game in recentGames" :key="game.id" :game-data="game"></game-item>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GameItem from '@/components/GameItem'
  export default {
    name: 'games',
    data () {
      return {
        msg: 'Games component'
      }
    },
    computed: {
      ...mapGetters(['recentGames'])
    },
    created () {
      this.$store.dispatch('getGames')
    },
    components: {
      GameItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
