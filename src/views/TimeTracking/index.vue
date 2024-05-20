<script setup lang="ts">
import {computed, onMounted, Ref, ref, watch} from "vue"
import { useRoute, useRouter } from 'vue-router'
import dayjs from "dayjs"
import useTimeTrackingStore from '@/store/timeTracking'
import { TypeTimeTrackingItemRead } from "@/types/time-tracking"
import { months, years } from "./dates";

const route = useRoute()
const router = useRouter()
const timeTrackingStore = useTimeTrackingStore()

const month: Ref<string> = ref('')
const year: Ref<string> = ref('')

const timeTrackingData: Ref<TypeTimeTrackingItemRead[]> = ref([])

const tasks = computed(() => timeTrackingData.value.reduce((acc, val) => {
  const key = dayjs(val.date.seconds * 1000).format('YYYY-MM-DD')
  if (!acc[key]) {
    acc[key] = {
      id: val.id,
      tasks: [
        {
          hours: val.hours,
          task: val.task,
        }
      ]
    }
  } else {
    acc[key].tasks.push({
      hours: val.hours,
      task: val.task,
    })
  }

  return acc
}, {}))

watch(() => route.params, async () => {
  timeTrackingData.value = await timeTrackingStore.fetchTimeTracking(Number(route.params.month), Number(route.params.year))
}, {
  immediate: true,
})

const goToMonth = (month: string) => {
  router.push(`/time-tracking/${route.params.year}/${month}`)
}

const goToYear = (year: string) => {
  router.push(`/time-tracking/${year}/${route.params.month}`)
}

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
  </div>
  <s-calendar-month :tasks="tasks" />
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
