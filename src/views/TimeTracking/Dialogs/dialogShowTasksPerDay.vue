<script setup lang="ts">
import dayjs from "dayjs";
import {defineModel, PropType} from "vue";
import {TypeTaskInDayData} from "@/views/TimeTracking/types";

defineProps({
  day: {
    type: String,
    default: ''
  },
  tasks: {
    type: Array as PropType<TypeTaskInDayData[]>,
    default: () => []
  }
})

const isOpen = defineModel()
</script>

<template>
  <s-dialog v-model="isOpen">
    <template #title>
      {{ dayjs(day).format('DD MMMM YYYY') }}
    </template>
    <template #content>
      <div
        v-for="(taskItem, index) in tasks"
        :key="`${index}-${taskItem.task}-${taskItem.hours}`"
        class="task mb-4"
      >
        <div class="d-flex align-center">
          Hours: {{taskItem.hours}}
        </div>
        <div class="d-flex align-center">
          Task: {{ taskItem.task }}
        </div>
      </div>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss">

</style>
