<script setup lang="ts">
  import { computed, defineModel, ref } from "vue";
  import { onClickOutside } from "@vueuse/core";

  const props = defineProps({
    minWidth: {
      type: String,
      default: "300px",
    },
  });

  const model = defineModel();
  const target = ref(null);

  const style = computed(() => [
    {
      minWidth: props.minWidth,
    },
  ]);

  const close = () => {
    model.value = false;
  };

  onClickOutside(target, () => close());
</script>

<template>
  <div
    v-if="model"
    class="s-dialog"
  >
    <div
      class="s-dialog--body"
      :style="style"
      ref="target"
    >
      <div class="s-dialog--header">
        <div class="s-dialog--title d-flex justify-space-between">
          <slot name="title" />
        </div>
        <s-icon
          icon="mdiClose"
          color="#ffffff"
          :size="24"
          class="s-dialog--close-icon"
          @click="close"
        />
      </div>
      <div class="s-dialog--content">
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    &--body {
      position: relative;
      background-color: #ffffff;
      border-radius: 8px;
      user-select: text;
    }

    &--header {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: $c-primary;
      padding: 16px;
      border-radius: 8px 8px 0 0;
    }

    &--title {
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      margin-right: auto;
    }

    &--content {
      padding: 16px;
    }

    &--close-icon {
      cursor: pointer;
      z-index: 9999;
    }
  }
</style>
