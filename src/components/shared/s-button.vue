<script setup lang="ts">
import {computed, ComputedRef, PropType} from 'vue'
import {RouteLocationRaw} from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<'default' | 'outlined' | 'text'>,
    default: 'default'
  },
  type: {
    type: String as PropType<'button' | 'reset' | 'submit'>,
    default: 'button'
  },
  color: {
    type: String as PropType<'primary' | 'support-1' | 'success' | 'info' | 'warning' | 'error'>,
    default: 'primary'
  },
  icon: {
    type: String
  },
  iconSize: {
    type: Number,
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: Object as PropType<RouteLocationRaw>,
    default: null
  },
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_self'>,
    default: '_blank'
  },
})

const classList = computed(() => ([
  `variant-${props.variant}`,
  `color-${props.color}`,
  `size-${props.size}`,
  props.disabled && 'disabled',
]))

const style = computed(() => ({
  height: props.height,
  width: props.width
}))

const icon = computed(() => props.icon || null)

const iconSizeComputed: ComputedRef<number> = computed(() => {
  if (props.iconSize) return props.iconSize
  else {
    switch (props.size) {
      case "large":
        return 24
      case "medium":
        return 20
      case "small":
        return 16
    }
  }
})

const buttonComponent: ComputedRef<'button' | 'router-link' | 'a'> = computed(() => {
  if (props.to) return 'router-link'
  else if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="buttonComponent"
    :to="to"
    :href="href"
    :target="target"
    class="s-button d-flex align-center justify-center"
    :class="classList"
    :style="style"
  >
    <s-icon
      v-if="icon"
      type="mdi"
      :icon="icon"
      :size="iconSizeComputed"
      class="s-button-icon"
    />
    <span class="s-button-title">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
.s-button {
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  transition: background .2s;
  will-change: background;

  &:focus {
    outline: none;
  }

  &-title {
    white-space: nowrap;
  }

  &-icon + &-title {
    margin-left: 8px;
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &.size {
    &-small {
      padding: 12px;
      font-size: 12px;
    }

    &-medium {
      padding: 12px 16px;
    }

    &-large {
      padding: 16px 24px;
    }
  }

  &.variant {
    &-outlined {
      border-width: 1px;
      border-style: solid;
      background-color: transparent;;
    }
  }

  &.color {
    $colors: (
      primary: $c-primary,
      support-1: $c-support-1,
      info: $c-info,
      success: $c-success,
      warning: $c-warning,
      error: $c-error
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
              background-color: rgba($colorVariable, 0.15)
            }
          }

          &-text {
            border: none;
            color: $colorVariable;

            &.disabled {
              color: $c-disabled;
            }

            &:hover {
              color: rgba($colorVariable, 0.15)
            }
          }
        }
      }
    }
  }
}
</style>
