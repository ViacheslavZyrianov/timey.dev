<script setup lang="ts">
  import { computed, ComputedRef, PropType, ref, Ref } from "vue";
  import { TypeDropdownItem } from "@/components/shared/types/dropdown";
  import { Color } from "@/types/common";
  import { onClickOutside } from "@vueuse/core";

  const props = defineProps({
    items: {
      type: Array as PropType<TypeDropdownItem[]>,
      default: () => [],
    },
  });

  const isItemsVisible: Ref<boolean> = ref(false);
  const target = ref(null);

  const sDropdownItemsClassList: ComputedRef<string[]> = computed(() => [
    "s-dropdown--items",
    isItemsVisible.value && "s-dropdown--items-visible",
  ]);

  const sDropdownItemClassList: ComputedRef<(color: Color) => string[]> =
    computed(() => (color: Color) => [
      "s-dropdown--item",
      `s-dropdown--item-${color || Color.Default}`,
    ]);

  const onActivatorClick = () => {
    isItemsVisible.value = !isItemsVisible.value;
  };

  onClickOutside(target, () => (isItemsVisible.value = false));
</script>

<template>
  <div class="s-dropdown">
    <slot name="activator">
      <div
        class="s-dropdown--activator"
        @click="onActivatorClick"
      >
        <s-button
          variant="outlined"
          is-only-icon
          icon="mdiDotsVertical"
        />
      </div>
    </slot>
    <ul
      :class="sDropdownItemsClassList"
      ref="target"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="sDropdownItemClassList(item.color)"
        @click="item.onClick"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .s-dropdown {
    position: relative;

    &--items {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #fff;
      transform: translateY(calc(100% + 16px));
      box-shadow: 0 0 16px 0 #d9d9d9;
      border-radius: 8px;
      opacity: 0;
      visibility: hidden;
      transition:
        transform 0.3s,
        opacity 0.3s,
        visibility 0.3s;

      &-visible {
        opacity: 1;
        visibility: visible;
      }
    }

    &--item {
      font-size: 14px;
      padding: 12px 18px;
      cursor: pointer;
      transition: background-color 0.3s;

      &-default {
        &:hover {
          background-color: #f1f1f1;
        }
      }

      &-error {
        color: $c-error;

        &:hover {
          background-color: lighten($c-error, 25%);
        }
      }
    }
  }
</style>