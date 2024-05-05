<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import dayjs from "dayjs";
import useTimeTrackingStore from '@/store/timeTracking'
import timeTable from './time-table/index.vue'
import { TypeTimeTrackingItemRead } from "@/types/time-tracking";

const route = useRoute()
const timeTrackingStore = useTimeTrackingStore()

const years = [2023, 2024]
const timeTrackingData: Ref<TypeTimeTrackingItemRead[]> = ref([])

watch(() => route.params, async () => {
  timeTrackingData.value = await timeTrackingStore.fetchTimeTracking(Number(route.params.month), Number(route.params.year))
}, {
  immediate: true,
})

const toYear = (year: number) => `/time-tracking/${year}/${route.params.month}`
const toMonth = (month: number) => `/time-tracking/${route.params.year}/${month}`
</script>

<template>
  <div class="d-flex full-width">
    <div class="years d-flex direction-column flex-row-gap-8 mb-8 mr-8 pr-8">
      <s-card
        v-for="year in years"
        :key="year"
        :to="toYear(year)"
        width="180px"
      >
        <template #content>
          {{ year }}
        </template>
      </s-card>
    </div>
    <div class="row mb-8 full-width">
      <s-card
        v-for="month in 12"
        :key="month"
        :to="toMonth(month)"
      >
        <template #content>
          {{ dayjs().month(month - 1).format('MMMM') }}
        </template>
      </s-card>
    </div>
  </div>
  <time-table :data="timeTrackingData" />
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
