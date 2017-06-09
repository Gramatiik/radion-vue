<template>
  <transition mode="out-in" name="modal-fade">
    <div class="ModalComponent" v-if="isVisible">
      <div class="ModalComponent_Backdrop" @click="onClose"></div>
      <div class="ModalComponent_Content">
        <div class="ModalComponent_Content_Title">
          <slot name="title"></slot>
        </div>
        <div class="ModalComponent_Content_Body">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-component',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      }
    },
    mounted: function () {
      // close modal on ESC key press
      document.addEventListener('keydown', (e) => {
        if (this.isVisible && e.keyCode === 27) {
          this.onClose()
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

    .ModalComponent {
      position: relative;

      &_Backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 25;
        background-color: rgba($bg-dark, .7);
      }

      &_Content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        z-index: 26;
        background-color: $bg-light;
        padding: 8px;

        &_Title {
          font-size: 1.2em;
          padding-bottom: 2px;
          border-bottom: 1px solid $bg-dark;
        }

        &_Body {

        }
      }

    }
</style>
