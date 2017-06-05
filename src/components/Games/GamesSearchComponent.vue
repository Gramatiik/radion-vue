<template>
    <div class="GamesSearchComponent">
      <input type="text" title="Search" placeholder="Search games..." v-model="searchQuery">
      <button @click="performSearch" :disabled="!searchQuery">Go</button>
    </div>
</template>

<script>
  /**
   * Component that displays an input used to perform search on IGDB games
   */
  export default {
    name: 'games-search-component',
    data () {
      return {
        searchQuery: ''
      }
    },
    methods: {
      performSearch () {
        this.$router.push({
          name: 'GamesSearch',
          params: {
            query: encodeURI(this.searchQuery)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .GamesSearchComponent {
    }
</style>
