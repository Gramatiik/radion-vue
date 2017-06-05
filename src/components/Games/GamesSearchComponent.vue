<template>
    <div class="GamesSearchComponent">
      <form @submit.prevent="performSearch">
        <input type="text" title="Search" placeholder="Search for games..." v-model="searchQuery" @submit="performSearch">
        <button :disabled="!searchQuery">Go</button>
      </form>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { MENU_TOGGLE } from '@/store/mutation-types'
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
      ...mapMutations([MENU_TOGGLE]),
      performSearch () {
        this.MENU_TOGGLE()
        let query = this.searchQuery
        this.searchQuery = ''
        this.$router.push({
          name: 'GamesSearch',
          params: {
            query: encodeURI(query)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .GamesSearchComponent {
    margin-bottom: 5px;
    font-size: 1.2rem;

    form {
      display: flex;
      width: 100%;

      input {
        margin-left: 12px;
        margin-right: 5px;
        flex: 1;
      }

      button {
        background-color: $accent;
        margin-right: 12px;
        border: none;
        color: $font-light;
        transition: background-color .1s ease;

        &:hover {
          background-color: lighten($accent, 15%);
        }
      }
    }
  }
</style>
