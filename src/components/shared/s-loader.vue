<script setup lang="ts">
  import { computed, ComputedRef, PropType } from "vue";
  import { Size } from "@/types/common";

  const props = defineProps({
    size: {
      type: String as PropType<Size>,
      default: Size.Medium,
    },
  });

  const sLoaderClassList: ComputedRef<string[]> = computed(() => [
    "s-loader",
    `s-loader--${props.size}`,
  ]);
</script>

<template>
  <div :class="sLoaderClassList" />
</template>

<style scoped lang="scss">
  .s-loader {
    border-color: $c-primary lighten($c-primary, 30%) lighten($c-primary, 30%)
      lighten($c-primary, 30%);
    border-style: solid;
    border-radius: 50%;
    animation: spin 1s infinite linear;

    &--small {
      width: 24px;
      height: 24px;
      border-width: 4px;
    }

    &--medium {
      width: 36px;
      height: 36px;
      border-width: 8px;
    }

    &--large {
      width: 56px;
      height: 56px;
      border-width: 8px;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
