<template>
    <div class="SettingsPage">
      <h1>Settings</h1>

      <div class="SettingsPage_SettingCategory">

        <h3 class="SettingsPage_SettingCategory_Title">Notifications</h3>

        <div class="SettingsPage_SettingCategory_Content">
          <div class="SettingsPage_SettingItem">
            <label for="notifications">Enable notifications</label>
            <input type="checkbox" id="notifications" v-model="enableNotifications">
          </div>
        </div>

      </div>

      <div class="SettingsPage_SettingCategory">

        <h3 class="SettingsPage_SettingCategory_Title">Cache</h3>

        <div class="SettingsPage_SettingCategory_Content-row">
          <div class="SettingsPage_SettingItem">
            <button class="button" @click="clearCache()">Clear all cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button" @click="clearCache('platforms')">Clear platforms cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button" @click="clearCache('pulseSources')">Clear pulse sources cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="button" @click="clearCache('genres')">Clear genres cache</button>
          </div>
        </div>

      </div>

      <button class="button big rounded" @click="saveSettings">Save</button>
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
          case 'platforms':
            localStorage.removeItem('platforms')
            break
          case 'pulseSources':
            localStorage.removeItem('pulseSources')
            break
          case 'genres':
            localStorage.removeItem('genres')
            break
          default:
            localStorage.clear()
        }
        // then reload the page to re-init state
        location.reload()
      },
      saveSettings () {
        // settings should reflect user selected values
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

  .SettingsPage {

    &_SettingCategory {
      margin-bottom: 12px;

      &_Title {
        color: $primary;
      }

      &_Content {
        margin-left: 12px;

        &-row {
          display: flex;
          flex-flow: row wrap;
        }
      }
    }

    &_SettingItem {
      font-size: 1.4rem;
    }
  }
</style>
