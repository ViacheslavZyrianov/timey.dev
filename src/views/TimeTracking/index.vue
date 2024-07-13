<script setup lang="ts">
import {computed, ComputedRef, onMounted, Ref, ref, watch} from "vue"
import {useRoute, useRouter} from 'vue-router'
import dayjs from "dayjs"
import {months, years} from "./dates";
import {TypeTimeTrackingItemRead} from "@/types/time-tracking"
import useTimeTrackingStore from '@/store/timeTracking'
import DialogAddTask from "./Dialogs/dialogAddTask.vue";
import SSelect from "@/components/shared/s-select.vue";
import DialogShowTasksPerDay from "@/views/TimeTracking/Dialogs/dialogShowTasksPerDay.vue";
import {TypeTaskInDayData} from "@/views/TimeTracking/types";

const route = useRoute()
const router = useRouter()
const timeTrackingStore = useTimeTrackingStore()

const month: Ref<string> = ref('')
const year: Ref<string> = ref('')
const isDialogAddTaskVisible: Ref<boolean> = ref(false)
const isDialogShowTaskPerDayVisible: Ref<boolean> = ref(false)
const selectedDate: Ref<Object> = ref(dayjs())
const selectedDay: Ref<string> = ref('')

const timeTrackingData: Ref<TypeTimeTrackingItemRead[]> = ref([])

const tasks: ComputedRef<{ [key: string]: TypeTaskInDayData[] }> = computed(() => timeTrackingData.value
  .reduce((acc: { [key: string]: TypeTaskInDayData[] }, val: TypeTimeTrackingItemRead) => {
    const key: string = dayjs(val.date.seconds * 1000).format('YYYY-MM-DD')
    const dayData: TypeTaskInDayData = {
      id: val.id,
      hours: val.hours,
      task: val.task,
    }

    if (!acc[key]) acc[key] = [dayData]
    else acc[key].push(dayData)

    return acc
  }, {}))

const tasksPerDay: ComputedRef<TypeTaskInDayData[]> = computed(() => tasks.value[selectedDay.value] || [])

const goToMonth = (month: string) => {
  router.push(`/time-tracking/${route.params.year}/${month}`)
}

const goToYear = (year: string) => {
  router.push(`/time-tracking/${year}/${route.params.month}`)
}

const fetchTimeTrackingForCurrentMonthAndYear = async () => {
  timeTrackingData.value = await timeTrackingStore.fetchTimeTracking(Number(route.params.month), Number(route.params.year))
}

const onAddTask = () => {
  isDialogAddTaskVisible.value = true;
}

const onShowDayWithTimeTracking = (day: string) => {
  selectedDay.value = day
  isDialogShowTaskPerDayVisible.value = true
}

watch(() => route.params, async () => {
  await fetchTimeTrackingForCurrentMonthAndYear()
  selectedDate.value = dayjs(`${route.params.year}-${route.params.month}-01`, 'YYYY-M-D')
}, {
  immediate: true,
})

onMounted(() => {
  month.value = route.params.month.toString() || dayjs().format('M')
  year.value = route.params.year.toString() || dayjs().format('YYYY')
})
</script>

<template>
  <div class="d-flex full-width mb-6">
    <s-select
      v-if="year"
      v-model="year"
      :items="years"
      class="mr-6"
      @update:model-value="goToYear"
    />
    <s-select
      v-if="month"
      v-model="month"
      :items="months"
      width="160px"
      @update:model-value="goToMonth"
    />
    <s-button icon="mdiPlus" class="ml-auto" @click="onAddTask">Add task</s-button>
  </div>
  <s-calendar
    :selected-date="selectedDate"
    :dataset="tasks"
    is-weekdays-visible
    format-dataset-item-element="{hours}h – {task}"
    @select-day="onShowDayWithTimeTracking"
  />

  <dialog-add-task v-model="isDialogAddTaskVisible" @submit="fetchTimeTrackingForCurrentMonthAndYear" />
  <dialog-show-tasks-per-day v-model="isDialogShowTaskPerDayVisible" :day="selectedDay" :tasks="tasksPerDay" />
</template>

<style scoped lang="scss">
.years {
  border-right: 1px solid #d6d6d6;
}
.row {
  display: grid;
  grid-template-columns: repeat(4, minmax(110px, 1fr));
  grid-gap: 16px;
}
</style>
