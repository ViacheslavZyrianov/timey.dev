<script setup lang="ts">
import { computed, Ref, useAttrs, defineModel, StyleValue } from "vue";

const $attrs = useAttrs();
const props = defineProps({
  width: {
    type: String,
    default: 'auto'
  }
})
const model = defineModel();

const placeholder: Ref<string> = computed(() => $attrs?.placeholder as string);

const sInputStyle: Ref<StyleValue> = computed(() => ({
  width: props.width,
}))
</script>

<template>
  <div class="s-input" :style="sInputStyle">
    <div v-if="$attrs.label" class="s-input__label">{{ $attrs.label }}</div>
    <input v-model="model" type="text" :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
.s-input {
  &__label {
    font-size: 14px;
    color: #4a4a4a;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    border: 1px solid #b3b3b3;
    border-radius: 8px;
    padding: 16px;
    transition: border-color 0.2s;
    will-change: border-color;

    &:focus {
      outline: none;
      border-color: $c-primary;
    }

    &::placeholder {
      color: #c1c1c1;
    }
  }
}
</style>
