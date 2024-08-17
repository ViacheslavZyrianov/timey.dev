<script setup lang="ts">
  import { PropType } from "vue";
  import { Breadcrumb } from "@/components/shared/types/breadcrumbs";

  defineProps({
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => [],
    },
  });
</script>

<template>
  <div class="s-breadcrumbs d-flex align-center mb-8">
    <template
      v-for="breadcrumb in breadcrumbs"
      :key="`${breadcrumb.label}-${breadcrumb.to}`"
    >
      <template v-if="breadcrumb.to">
        <s-link
          class="breadcrumb"
          :to="breadcrumb.to"
        >
          {{ breadcrumb.label }}
        </s-link>
        <s-icon
          icon="mdiChevronRight"
          class="mx-4"
          color="#4b49ac"
        />
      </template>
      <span v-else>{{ breadcrumb.label }}</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .breadcrumb {
    display: flex;
    align-items: center;
    position: relative;
  }
</style>
