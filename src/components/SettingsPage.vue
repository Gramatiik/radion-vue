<template>
    <div class="SettingsPage">
      <h1>Settings</h1>

      <div class="SettingsPage_SettingCategory" v-if="isPushNotificationsSupported">
        <h3 class="SettingsPage_SettingCategory_Title">Notifications</h3>

        <div class="SettingsPage_SettingCategory_Content">
          <div class="SettingsPage_SettingItem">
            <button v-if="!isPushNotificationsEnabled" class="Button" @click="togglePush(true)">Register</button>
            <button v-else class="Button" @click="togglePush(false)">Unregister</button>
          </div>
        </div>

      </div>

      <div class="SettingsPage_SettingCategory">
        <h3 class="SettingsPage_SettingCategory_Title">Cache</h3>

        <div class="SettingsPage_SettingCategory_Content grid-2 has-gutter">
          <div class="SettingsPage_SettingItem">
            <button class="Button Button-full" @click="clearCache()">Clear all cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="Button Button-full" @click="clearCache('platforms')">Clear platforms cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="Button Button-full" @click="clearCache('pulseSources')">Clear pulse sources cache</button>
          </div>

          <div class="SettingsPage_SettingItem">
            <button class="Button Button-full" @click="clearCache('genres')">Clear genres cache</button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  /* global OneSignal:false */
  export default {
    name: 'settings-page',
    data () {
      return {
        cacheTypes: [ 'platforms', 'pulseSources', 'genres' ],
        isPushNotificationsEnabled: false
      }
    },
    computed: {
      isPushNotificationsSupported () {
        return OneSignal.isPushNotificationsSupported()
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
      togglePush (status) {
        OneSignal.push(() => {
          if (status) OneSignal.registerForPushNotifications()
          OneSignal.setSubscription(status)
        })

        // if the user is unsubscribing, present a notification
        if (!status) {
          new window.Notification('Radion.mx', { // eslint-disable-line no-new
            body: 'Notifications are now turned off.',
            icon: 'https://radion.mx/images/radion_onesignal.png'
          })
        }
      }
    },
    created () {
      OneSignal.isPushNotificationsEnabled().then((isSubscribed) => {
        this.isPushNotificationsEnabled = isSubscribed
      })

      OneSignal.on('subscriptionChange', (isSubscribed) => {
        this.isPushNotificationsEnabled = isSubscribed
      })
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
      margin-bottom: 10px;
    }
  }
</style>
