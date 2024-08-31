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

  const formatTime = (hours: number, minutes = 0) =>
    `${hours}`.padStart(2, "0") + ":" + `${minutes || 0}`.padStart(2, "0");
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
        class="d-flex align-center flex-column-gap-4 flex-row-gap-4"
      >
        <div class="font-weight-700">
          {{ formatTime(taskItem.hours, taskItem.minutes) }}
        </div>
        <div class="font-size-14 flex-grow-1">
          {{ taskItem.task }}
        </div>
      </div>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss"></style>
