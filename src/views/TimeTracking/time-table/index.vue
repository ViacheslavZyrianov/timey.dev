<script setup lang="ts">
import {computed, ComputedRef, PropType} from "vue";
import headers from "./headers";
import checkIsLink from "@/utils/checkIsLink";
import { TypeTimeTrackingItemRead } from "@/types/time-tracking";
import { TypeTableRow } from "@/components/shared/s-table/types";
import dayjs from "dayjs";

const props = defineProps({
  data: {
    type: Array as PropType<TypeTimeTrackingItemRead[]>,
    default: [],
  }
})

const rows: ComputedRef<TypeTableRow[]> = computed(() => props.data.map((timeTrackingItem: TypeTimeTrackingItemRead) => ({
  id: timeTrackingItem.id,
  date: dayjs(timeTrackingItem.date.seconds * 1000).format("DD.MM.YYYY"),
  task: timeTrackingItem.task,
  duration: timeTrackingItem.hours
})))

const onEdit = async (id: string) => {
}

const onDelete = (id: string) => {
}
</script>

<template>
  <s-table
    :headers="headers"
    :rows="rows"
  >
    <template #task="{ row }">
      <a v-if="checkIsLink(row.task)" :href="row.task" target="_blank">{{ row.task }}</a>
      <template v-else>
        {{ row.task }}
      </template>
    </template>
    <template #actions>
      <div class="d-flex align-center flex-gap-6">
        <s-button
          color="info"
          icon="mdiPencil"
          variant="outlined"
          size="small"
          @click="onEdit"
        />
        <s-button
          color="error"
          icon="mdiDeleteOutline"
          variant="outlined"
          size="small"
        />
      </div>
    </template>
  </s-table>
</template>

<style scoped lang="scss">

</style>
