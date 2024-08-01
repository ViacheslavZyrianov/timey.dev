<script setup lang="ts">
  import { computed } from "vue";

  const model = defineModel({
    type: Boolean,
    default: false,
  });

  const sSwitchClassList = computed(() => [
    "s-switch d-flex align-center flex-column-gap-4",
    `s-switch--${model.value}`,
  ]);

  const onToggleSwitch = () => {
    model.value = !model.value;
  };
</script>

<template>
  <div
    :class="sSwitchClassList"
    @click="onToggleSwitch"
  >
    <slot name="prepended-text" />
    <div class="switcher">
      <div class="switcher-dot" />
    </div>
    <slot name="appended-text" />
  </div>
</template>

<style scoped lang="scss">
  $size: 14px;
  $paddings: 4px;

  .s-switch {
    .switcher {
      width: calc(($size * 2) + ($paddings * 2));
      height: calc($size + ($paddings * 2));
      cursor: pointer;
      border-radius: calc($size - ($paddings / 2));
      padding: $paddings;
      transition: background-color 0.3s;

      &-dot {
        width: $size;
        height: $size;
        background-color: $c-primary;
        border-radius: 50%;
        transition: transform 0.3s;
      }
    }

    &--true {
      .switcher {
        background-color: lighten($c-success, 40%);

        &-dot {
          background-color: $c-success;
          transform: translateX(100%);
        }
      }
    }

    &--false {
      .switcher {
        background-color: lighten($c-error, 25%);

        &-dot {
          background-color: $c-error;
        }
      }
    }
  }
</style>
