<script setup lang="ts">
import {computed, defineModel, ref} from "vue"
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
   minWidth: {
     type: String,
     default: '300px'
   }
})

const model = defineModel()
const target = ref(null)

const style = computed(() => [
  {
    minWidth: props.minWidth
  }
])

const close = () => {
  model.value = false
}

onClickOutside(target, event => close())
</script>

<template>
<div v-if="model" class="s-dialog">
  <div class="s-dialog-body" :style="style" ref="target">
    <s-icon icon="mdiClose" color="#ffffff" :size="24" class="s-dialog-close-icon" @click="close" />
    <div class="s-dialog-title">
      <slot name="title" />
    </div>
    <div class="s-dialog-content">
      <slot name="content" />
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.s-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  z-index: 9999;

  &-body {
    position: relative;
    background-color: #ffffff;
    border-radius: 8px;
    user-select: text;
  }

  &-title {
    padding: 16px;
    margin-bottom: 0;
    background-color: $c-support-1;
    color: #ffffff;
    font-weight: 600;
    border-radius: 8px 8px 0 0;
  }

  &-content {
    padding: 16px;
  }

  &-close-icon {
    position: absolute;
    top: -30px;
    right: -30px;
    transition: transform .2s;
    will-change: transform;
    cursor: pointer;
    z-index: 9999;

    &:hover {
      transform: rotate(180deg) scale(1.1);
    }
  }
}
</style>
