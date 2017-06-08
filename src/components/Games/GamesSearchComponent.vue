<template>
    <div class="GamesSearchComponent">
      <form class="GamesSearchComponent_Form" @submit.prevent="performSearch">
        <input class="GamesSearchComponent_Form_Input" type="text" title="Search" placeholder="Search for games..." v-model="searchQuery" @submit="performSearch">
        <button class="GamesSearchComponent_Form_Submit" :disabled="!searchQuery">Go</button>
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
    margin-bottom: 10px;
    font-size: 1.2rem;

    &_Form {
      display: flex;
      width: 100%;
      padding: 0 12px;

      &_Input {
        flex: 1;
      }

      &_Submit {
        background-color: $accent;
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
