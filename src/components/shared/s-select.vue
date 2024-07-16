<script setup lang="ts">
  import { computed, ComputedRef, defineModel, PropType, ref } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { TypeSelectItem } from "@/components/shared/types/select";

  const props = defineProps({
    items: {
      type: Array as PropType<TypeSelectItem[]>,
      default: () => [],
    },
    width: {
      type: String,
      default: "auto",
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const model = defineModel();

  const isOpen = ref(false);
  const target = ref(null);

  const label: ComputedRef<string> = computed(
    () => props.items.find((item) => item.value === model.value)?.label || "",
  );

  const selectItemsClassList = computed(() => [
    "s-select-items",
    isOpen.value && "s-select-items--opened",
  ]);

  const style = computed(() => ({
    width: props.width,
  }));

  const selectItemClassList = computed(() => (value: string) => [
    "s-select-item",
    model.value === value && "s-select-item--current",
  ]);

  const closeItems = () => {
    isOpen.value = false;
  };

  const onToggle = () => {
    isOpen.value = !isOpen.value;
  };

  const onSelectItem = (value: string) => {
    closeItems();
    emit("update:modelValue", value);
  };

  onClickOutside(target, () => closeItems());
</script>

<template>
  <div
    class="s-select"
    :style="style"
  >
    <s-card
      class="s-select-input d-flex align-center justify-space-between"
      hover
      ref="target"
      @click="onToggle"
    >
      <template #content>
        <div class="s-select-input-label">{{ label }}</div>
        <s-icon
          icon="mdiChevronDown"
          class="ml-2 s-select-chevron"
          color="#4b49ac"
        />
      </template>
    </s-card>
    <s-card
      :class="selectItemsClassList"
      padding="0"
    >
      <template #content>
        <div
          v-for="item in items"
          :key="item.value"
          :class="selectItemClassList(item.value)"
          @click="onSelectItem(item.value)"
        >
          {{ item.label }}
        </div>
      </template>
    </s-card>
  </div>
</template>

<style scoped lang="scss">
  .s-select {
    position: relative;
    cursor: pointer;
    user-select: none;
    z-index: 10;

    &-input-label {
      font-weight: 600;
      color: $c-primary;
    }

    &-items {
      position: absolute;
      top: 0;
      right: 0;
      max-height: 300px;
      width: 100%;
      overflow-y: auto;
      transform: translateY(55px);
      opacity: 0;
      visibility: hidden;
      will-change: transform, opacity, visibility;
      transition:
        transform 0.2s,
        opacity 0.2s,
        visibility 0.2s;

      &--opened {
        transform: translateY(60px);
        opacity: 1;
        visibility: visible;
      }
    }

    &-item {
      padding: 16px;
      transition: background-color 0.2s;
      will-change: background-color;

      &--current {
        font-weight: 600;
        color: $c-primary;
        cursor: not-allowed;
        pointer-events: none;
      }

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #e6e6f4;
      }
    }
  }
</style>
