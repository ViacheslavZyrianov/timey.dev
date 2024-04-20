<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
    required: true
  },
  rounded: {
    type: Boolean,
    default: true
  },
  size: {
    type: Number,
    default: 64
  }
})

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))

const classList = computed(() => ({
  rounded: props.rounded
}))
</script>


<template>
  <div
    class="s-avatar"
    :style="style"
    :class="classList"
  >
    <img :src="props.src" />
  </div>
</template>

<style lang="scss" scoped>
.s-avatar {
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
  &.rounded {
    border-radius: 25%;
  }
}
</style>