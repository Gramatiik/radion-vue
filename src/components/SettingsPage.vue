<template>
    <div class="SettingsPage">
      <h1>Settings</h1>

      <div class="SettingsPage_SettingCategory">
        <h3>Cache</h3>
        <div>
          <div class="SettingsPage_SettingItem">
            <button class="button small" @click="clearCache('all')">Clear all cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button" @click="clearCache('platforms')">Clear platforms cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button big" @click="clearCache('pulseSources')">Clear pulse sources cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button rounded" disabled="true" @click="clearCache('genres')">Clear genres cache</button>
          </div>
        </div>
      </div>

      <div class="SettingsPage_SettingCategory">
        <h3>Notifications</h3>
        <div>
          <div class="SettingsPage_SettingItem">
            <label for="notifications">Enable notifications</label>
            <input type="checkbox" id="notifications" v-model="enableNotifications">
          </div>
        </div>
      </div>


    </div>
</template>

<script>
  export default {
    name: 'settings-page',
    data () {
      return {
        cacheTypes: [ 'platforms', 'pulseSources', 'genres' ],
        enableNotifications: false
      }
    },
    methods: {
      clearCache (type) {
        // clear localstorage based on given key
        switch (type) {
          case 'all':
            localStorage.clear()
            break
          case 'platforms':
            localStorage.removeItem('platforms')
            break
          case 'pulseSources':
            localStorage.removeItem('pulseSources')
            break
          case 'genres':
            localStorage.removeItem('genres')
            break
        }
        // then reload the page to re-init state
        location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .SettingsPage {

    &_SettingCategory {
      border-bottom: 1px solid $accent;
      margin-bottom: 12px;
      padding-left: 12px;

      & > h3 {
        color: $primary;
      }

      & > div {

      }
    }

    &_SettingItem {
      font-size: 1.4rem;
    }
  }
</style>
