<script setup lang="ts">
import * as mdiIcon from '@mdi/js'

const props = defineProps({
  icon: {
    type: String,
    default: 'mdi-alert-circle-outline',
    required: true
  },
  size: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: 'currentcolor'
  }
})

const style = {
  width: `${props.size}px`,
  height: `${props.size}px`
}
</script>

<template>
  <svg
    :style="style"
    viewBox="0 0 24 24"
  >
    <path
      :d="mdiIcon[icon]"
      :fill="color"
    />
  </svg>
</template>
