<template>
    <div class="PlatformDetailsComponent">
      <modal-component :is-visible="isVisible" :on-close="closeDetails">
        <div slot="title" class="PlatformDetailsComponent_Title">{{ platformDetails.name }}</div>
        <div slot="body" class="PlatformDetailsComponent_Body">
          <div v-if="platformDetails.versions">
            <h3>Versions</h3>
            <ul class="PlatformDetailsComponent_Body_Versions">
              <li class="PlatformDetailsComponent_Body_Versions_Item"
                  v-for="(platformVersion, index) in platformDetails.versions">
                <strong class="PlatformDetailsComponent_Body_Versions_Item_Title" @click="index === selectedVersionIndex ? selectedVersionIndex = false : selectedVersionIndex = index">{{ platformVersion.name }}</strong>
                <transition mode="out-in" name="slide-fade">
                  <ul class="PlatformDetailsComponent_VersionDetails" v-if="selectedVersionIndex === index">
                    <li v-if="platformVersion.os"><strong>OS</strong> : {{ platformVersion.os }}</li>
                    <li v-if="platformVersion.cpu"><strong>CPU</strong> : {{ platformVersion.cpu }}</li>
                    <li v-if="platformVersion.storage"><strong>Storage</strong> : {{ platformVersion.storage }}</li>
                    <li v-if="platformVersion.memory"><strong>Memory</strong> : {{ platformVersion.memory }}</li>
                    <li v-if="platformVersion.graphics"><strong>Graphics</strong> : {{ platformVersion.graphics }}</li>
                    <li v-if="platformVersion.online"><strong>Online</strong> : {{ platformVersion.online }}</li>
                    <li v-if="platformVersion.connectivity"><strong>Connectivity</strong> : {{ platformVersion.connectivity }}</li>
                    <li v-if="platformVersion.release_dates"><strong>Release_dates</strong>
                      <ul>
                        <li v-for="rd in platformVersion.release_dates">{{ regions[rd.region - 1] }} : {{ new Date(rd.date)|moment('MM/DD/YYYY') }}</li>
                      </ul>
                    </li>
                    <li v-if="platformVersion.url"><a :href="platformVersion.url" target="_blank"><strong>IGDB Link</strong></a></li>
                  </ul>
                </transition>
              </li>
            </ul>
          </div>
        </div>
        <div slot="actions">
          <button class="Button Button-small" @click="closeDetails">Close</button>
        </div>
      </modal-component>
    </div>
</template>

<script>
  import ModalComponent from '@/components/Shared/ModalComponent'
  export default {
    name: 'platform-details-component',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      },
      platformDetails: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        selectedVersionIndex: false,
        regions: [
          'Europe (EU)',
          'North America (NA)',
          'Australia (AU)',
          'New Zealand (NZ)',
          'Japan (JP)',
          'China (CH)',
          'Asia (AS)',
          'Worldwide'
        ]
      }
    },
    components: {
      ModalComponent
    },
    methods: {
      closeDetails () {
        this.selectedVersionIndex = false
        this.onClose()
      }
    }
  }
</script>

<style scoped lang="scss">
    .PlatformDetailsComponent {
      &_Body {
        &_Versions {
          padding: 0;
          margin: 0;
          list-style-type: none;

          &_Item {
            &_Title {
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
