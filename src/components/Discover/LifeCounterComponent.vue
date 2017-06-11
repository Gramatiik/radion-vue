<template>
    <div class="LifeCounterComponent">
      <span v-for="index in max" class="LifeCounterComponent_Heart Icon" :class="[ index <= count ? 'Icon-Heart': 'Icon-Heart-empty' ]">
      </span>
    </div>
</template>

<script>
  export default {
    name: 'life-counter-component',
    props: {
      count: {
        type: Number,
        required: true,
        validator (value) {
          return value >= 0
        }
      },
      max: {
        type: Number,
        required: true,
        validator (value) {
          return value > 0
        }
      }
    },
    created () {
      if (this.count > this.max) throw new Error('count prop must be less or equals to max prop')
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .LifeCounterComponent {
    text-align: center;
    height: 20px;

    &_Heart {
      height: 20px;
      width: 20px;
    }
  }
</style>
