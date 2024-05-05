<script setup lang="ts">
import { defineSlots, computed } from 'vue'

const props = defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  }
})

const slots = defineSlots()

const tag = props.to ? 'router-link' : 'div'

const classList = computed(() => ([
  { hover: props.hover }
]))

const style = computed(() => ([
  { width: props.width }
]))
</script>

<template>
  <component
    :is="tag"
    :to="props.to"
    class="s-card"
    :class="classList"
    :style="style"
  >
    <div
      v-if="slots.title"
      class="title"
    >
      <slot name="title" />
    </div>
    <slot name="content" />
    <slot name="footer" />
  </component>
</template>

<style lang="scss" scoped>
.s-card {
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 #d9d9d9;
  border-radius: 8px;
  transition: color .2s, background .2s;
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
    transition: box-shadow .2s;
    will-change: box-shadow;

    &:hover {
      box-shadow: 0 0 8px 0 #aeaeae;
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
