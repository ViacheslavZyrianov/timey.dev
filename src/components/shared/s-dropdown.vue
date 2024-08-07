<script setup lang="ts">
  import { computed, ComputedRef, PropType, ref, Ref } from "vue";
  import { TypeDropdownItem } from "@/components/shared/types/dropdown";
  import { ClassList, Color } from "@/types/common";
  import { onClickOutside } from "@vueuse/core";
  import { ButtonVariant } from "@/components/shared/types/button";

  defineProps({
    items: {
      type: Array as PropType<TypeDropdownItem[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  });

  const isItemsVisible: Ref<boolean> = ref(false);
  const targetRef = ref(null);
  const targetRefIgnore = ref(null);

  const sDropdownItemsClassList: ComputedRef<ClassList> = computed(() => [
    "s-dropdown--items",
    { "s-dropdown--items-visible": isItemsVisible.value },
  ]);

  const sDropdownItemClassList: ComputedRef<(color: Color) => ClassList> =
    computed(
      () =>
        (color: Color): ClassList => [
          "s-dropdown--item",
          `s-dropdown--item-${color}`,
        ],
    );

  const onActivatorClick = () => {
    isItemsVisible.value = !isItemsVisible.value;
  };

  const onItemClick = (onClick?: () => void) => {
    onClick && onClick();
    isItemsVisible.value = false;
  };

  onClickOutside(targetRef, () => (isItemsVisible.value = false), {
    ignore: [targetRefIgnore],
  });
</script>

<template>
  <div class="s-dropdown">
    <slot name="activator">
      <div
        class="s-dropdown--activator"
        ref="targetRefIgnore"
        @click="onActivatorClick"
      >
        <s-button
          :variant="ButtonVariant.Outlined"
          is-only-icon
          icon="mdiDotsVertical"
          :disabled="disabled"
          :loading="loading"
        />
      </div>
    </slot>
    <ul
      :class="sDropdownItemsClassList"
      ref="targetRef"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="sDropdownItemClassList(item.color || Color.Default)"
        @click="onItemClick(item.onClick)"
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
      z-index: 1;
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
