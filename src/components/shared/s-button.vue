<script setup lang="ts">
import {computed, PropType} from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'button'
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
    type: String,
    default: 'medium'
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
  { block: props.block }
]))

const style = computed(() => ({
  height: props.height
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
      class="icon"
      :size="iconSize"
    />
    <span class="s-button-title">
      {{ props.title }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.s-button {
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 0 16px;
  cursor: pointer;
  transition: background .3s;
  will-change: background;

  &:focus {
    outline: none;
  }

  .icon {
    margin-right: 8px;
  }

  &-title {
    white-space: nowrap;
  }

  &.size {
    &-small {
      padding-top: 8px;
      padding-bottom: 8px;
      font-size: 12px;

      .icon {
        width: 16px;
        height: 16px;
      }
    }
    &-medium {
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 14px;
    }
    &-large {
      padding-top: 16px;
      padding-bottom: 16px;
      font-size: 16px;
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
