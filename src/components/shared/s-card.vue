<script setup lang="ts">
  import { defineSlots, computed, PropType, ComputedRef } from "vue";
  import { ClassList } from "@/types/common";

  const props = defineProps({
    hover: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "auto",
    },
    padding: {
      type: String,
      default: "16px",
    },
    variant: {
      type: String as PropType<"shadow" | "border">,
      default: "shadow",
    },
  });

  const slots = defineSlots();

  const tag = props.to ? "router-link" : "div";

  const sCardClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      { hover: props.hover },
      `s-card--variant-${props.variant}`,
    ],
  );

  const style = computed(() => [
    { width: props.width },
    { height: props.height },
    { padding: props.padding },
  ]);
</script>

<template>
  <component
    :is="tag"
    :to="props.to"
    class="s-card"
    :class="sCardClassList"
    :style="style"
  >
    <h3
      class="font-weight-800 mb-4"
      v-if="slots.title"
    >
      <slot name="title" />
    </h3>
    <slot name="content" />
    <slot name="footer" />
  </component>
</template>

<style lang="scss" scoped>
  .s-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    transition:
      color 0.2s,
      background 0.2s;
    will-change: color, background;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #252525;
    }

    &.router-link-active {
      color: #fff;
      background-color: $c-primary;

      &:hover {
        color: #fff;
        background-color: $c-primary;
      }
    }

    &.hover {
      transition: box-shadow 0.2s;
      will-change: box-shadow;

      &:hover {
        box-shadow: 0 0 8px 0 #aeaeae;
      }
    }

    &--variant {
      &-shadow {
        box-shadow: 0 0 16px 0 #d9d9d9;
      }

      &-border {
        border: 1px solid #ececec;
      }
    }
  }

  a.s-card {
    &:hover {
      color: $c-primary;
      background-color: lighten($c-primary, 45%);
    }
  }
</style>
