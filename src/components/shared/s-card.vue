<script setup lang="ts">
import { defineProps, defineSlots, computed } from 'vue'

const props = defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: ''
  }
})

const slots = defineSlots()

const tag = props.to ? 'router-link' : 'div'

const classList = computed(() => ([
  { hover: props.hover }
]))
</script>

<template>
  <component
    :is="tag"
    :to="props.to"
    class="s-card"
    :class="classList"
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
  border: 1px solid #ededed;
  border-radius: 8px;

  .title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  &.hover {
    transition: border-color .3s;
    will-change: border-color;

    &:hover {
      border-color: $c-primary;
    }
  }
}
</style>
