<script setup lang="ts">
  import { computed, ComputedRef, PropType } from "vue";
  import { RouteLocationRaw } from "vue-router";
  import { ClassList, Color, Size } from "@/types/common";
  import {
    ButtonType,
    ButtonVariant,
    LinkTarget,
  } from "@/components/shared/types/button";

  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
    variant: {
      type: String as PropType<ButtonVariant>,
      default: ButtonVariant.Default,
    },
    type: {
      type: String as PropType<ButtonType>,
      default: ButtonType.Button,
    },
    color: {
      type: String as PropType<Color>,
      default: Color.Primary,
    },
    isOnlyIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: Number,
      default: 18,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<Size>,
      default: Size.Medium,
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object as PropType<RouteLocationRaw>,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String as PropType<LinkTarget>,
      default: null,
    },
  });

  const sButtonClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      `variant-${props.variant}`,
      `color-${props.color}`,
      `size-${props.size}`,
      { ["is-only-icon"]: props.isOnlyIcon },
      { ["disabled"]: props.disabled },
      { ["loading"]: props.loading },
    ],
  );

  const style = computed(() => ({
    height: props.height,
    width: props.width,
  }));

  const iconClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      { "icon-prepended": true },
      { "mr-4": !props.isOnlyIcon },
    ],
  );

  const icon = computed(() => props.icon || null);

  const buttonComponent: ComputedRef<"button" | "router-link" | "a"> = computed(
    () => {
      if (props.to) return "router-link";
      else if (props.href) return "a";
      return "button";
    },
  );
</script>

<template>
  <component
    :is="buttonComponent"
    :to="to"
    :href="href"
    :target="target"
    class="s-button d-flex align-center justify-center"
    :class="sButtonClassList"
    :style="style"
  >
    <s-icon
      v-if="loading"
      type="mdi"
      icon="mdiLoading"
      class="icon-loading"
    />
    <s-icon
      v-if="icon"
      type="mdi"
      :icon="icon"
      :size="iconSize"
      :class="iconClassList"
    />
    <span
      v-if="!isOnlyIcon"
      class="s-button-title"
    >
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
  .s-button {
    position: relative;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
    will-change: background;

    &:focus {
      outline: none;
    }

    &-title {
      white-space: nowrap;
    }

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
    }

    &.loading {
      .icon-loading {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        visibility: visible;
      }

      .s-button-title,
      .icon-prepended {
        visibility: hidden;
      }
    }

    &.size {
      &-small {
        padding: 8px 12px;
      }

      &-medium {
        padding: 12px 16px;
      }

      &-large {
        padding: 16px 24px;
        font-size: 18px;
      }
    }

    &.variant {
      &-outlined {
        border-width: 1px;
        border-style: solid;
        background-color: transparent;
      }

      &-text {
        padding: 0;
      }
    }

    &.color {
      $colors: (
        primary: $c-primary,
        support-1: $c-support-1,
        info: $c-info,
        success: $c-success,
        warning: $c-warning,
        error: $c-error,
      );

      @each $color, $colorVariable in $colors {
        &-#{$color} {
          &.variant {
            &-default {
              background-color: $colorVariable;

              &.disabled {
                background-color: $c-disabled;
              }

              &:hover {
                background-color: lighten($colorVariable, 5%);
              }
            }

            &-outlined {
              border-color: $colorVariable;
              color: $colorVariable;

              &.disabled {
                border-color: $c-disabled;
              }

              &:hover {
                background-color: rgba($colorVariable, 0.15);
              }
            }

            &-text {
              border: none;
              color: $colorVariable;
              background-color: transparent;

              &.disabled {
                color: $c-disabled;
              }

              &:hover {
                color: $colorVariable;
              }
            }
          }
        }
      }
    }

    &.is-only-icon {
      &.size {
        &-small {
          padding: 8px;
        }

        &-medium {
          padding: 12px;
        }

        &-large {
          padding: 16px;
        }
      }
    }
  }

  .icon-loading {
    animation: rotate 1s infinite linear;
    visibility: hidden;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
