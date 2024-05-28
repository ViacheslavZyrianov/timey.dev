<script setup lang="ts">
import {computed, PropType} from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default'
  },
  type: {
    type: String as PropType<'button' | 'reset' | 'submit'>,
    default: 'button'
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String
  },
  iconSize: {
    type: Number,
    default: 16
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
  }
})

const classList = computed(() => ([
  `variant-${props.variant}`,
  `color-${props.color}`,
  `size-${props.size}`,
]))

const style = computed(() => ({
  height: props.height,
  width: props.width
}))

const icon = computed(() => props.icon || null)
</script>

<template>
  <button
    class="s-button d-flex align-center justify-center"
    :class="classList"
    :style="style"
  >
    <s-icon
      v-if="icon"
      type="mdi"
      :icon="icon"
      class="s-button-icon"
      :size="iconSize"
    />
    <span v-if="props.title" class="s-button-title">
      {{ props.title }}
    </span>
  </button>
</template>

<style lang="scss" scoped>

.s-button {
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
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

  &.size {
    &-small {
      padding: 8px;
      font-size: 12px;

      .icon {
        width: 16px;
        height: 16px;
      }
    }

    &-medium {
      padding: 12px 8px;
    }

    &-large {
      padding: 16px 8px;

      .icon {
        width: 20px;
        height: 20px;
      }
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

            &:hover {
              background-color: lighten($colorVariable, 5%);
            }
          }
          &-outlined {
            border-color: $colorVariable;
            color: $colorVariable;

            &:hover {
              background-color: rgba($colorVariable, 0.15)
            }
          }
        }
      }
    }
  }
}
</style>
