<template>
  <div>
    <div class="RatingMeterComponent" :style="{ height: customHeight + 'px' }">
      <div class="RatingMeterComponent_Value" :style="{ width: value + '%' }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rating-meter-component',
    props: {
      value: {
        type: Number,
        required: true,
        validator: function (value) {
          return value >= 0 && value <= 100
        }
      },
      customHeight: {
        type: Number,
        default: 5
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "variables";

  .RatingMeterComponent {
    width: 100%;
    background-color: lighten($primary, 20%);

    &_Value {
      background-color: $primary;
      height: 100%;
    }
  }
</style>
