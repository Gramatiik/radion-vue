<template>
  <transition mode="out-in" name="modal-fade">
    <div class="ModalComponent" v-if="isVisible">
      <div class="ModalComponent_Backdrop" @click="onClose"></div>
      <div class="ModalComponent_Content">
        <div class="ModalComponent_Content_Title">
          <slot name="title"></slot>
        </div>
        <div class="ModalComponent_Content_Body">
          <slot name="body"></slot>
        </div>
        <div class="ModalComponent_Content_Actions">
          <slot name="actions"></slot>
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
    methods: {
      closeWithEsc (e) {
        if (this.isVisible && e.keyCode === 27) {
          this.onClose()
        }
      }
    },
    mounted () {
      // close modal on ESC key press
      document.addEventListener('keydown', this.closeWithEsc)
    },
    beforeDestroy () {
      // close modal on ESC key press
      document.removeEventListener('keydown', this.closeWithEsc)
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";
  @import "mixins";

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
      width: 90%;
      max-height: 80vh;
      overflow-y: scroll;
      z-index: 26;
      background-color: $bg-light;
      border-radius: 5px;

      @include responsiveMinWidth($bp-mobile) {
        width: 80%;
      }

      @include responsiveMinWidth($bp-tablet) {
        width: 60%;
      }

      &_Title {
        background-color: $primary;
        color: $font-light;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 8px;
        border-bottom: 1px solid $bg-dark;
      }

      &_Body {
        font-size: 1.2rem;
        padding: 8px 16px;
      }

      &_Actions {
        padding: 8px;
        text-align: right;
      }
    }
  }
</style>
