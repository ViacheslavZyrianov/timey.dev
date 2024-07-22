<script setup lang="ts">
  import dayjs from "dayjs";
  import { defineModel, PropType } from "vue";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";

  defineProps({
    day: {
      type: String,
      default: "",
    },
    tasks: {
      type: Array as PropType<TypeTaskInDayData[]>,
      default: () => [],
    },
  });

  const isOpen = defineModel();
</script>

<template>
  <s-dialog
    v-model="isOpen"
    min-width="600px"
  >
    <template #title>
      {{ dayjs(day).format("DD MMMM YYYY") }}
    </template>
    <template #content>
      <div
        v-for="taskItem in tasks"
        :key="taskItem.id"
        class="d-flex flex-column-gap-4 mb-4"
      >
        <div class="d-flex align-center">
          <div class="font-size-16 font-weight-600 mr-4">
            {{ taskItem.hours }}
          </div>
          <div class="font-size-14">
            {{ taskItem.task }}
          </div>
        </div>
      </div>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss"></style>
