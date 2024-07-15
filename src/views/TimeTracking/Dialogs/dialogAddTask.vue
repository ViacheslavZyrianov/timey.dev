<script setup lang="ts">
import {defineModel, onMounted, reactive, ref, Ref, watch} from "vue";
import {TypeTimeTrackingItemAdd} from "@/types/time-tracking";
import useTimeTrackingStore from "@/store/timeTracking";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {TypeCalendarVariant, TypeWeekdaysFormat} from "@/components/shared/s-calendar/types";
import {months, years} from "@/views/TimeTracking/dates";

dayjs.extend(customParseFormat)

const emit = defineEmits(['submit'])

const timeTrackingStore = useTimeTrackingStore()

const isOpen = defineModel()

const form: TypeTimeTrackingItemAdd = reactive({
  task: "",
  hours: null,
  date: new Date(),
})
const isButtonSubmitDisabled: Ref<boolean> = ref(false)
const selectedDate: Ref<string> = ref('')
const month: Ref<string> = ref('')
const year: Ref<string> = ref('')

const onSelectDay = (date: string) => {
  selectedDate.value = date
}

const onSelectMonth = (_month: string) => {
  month.value = _month;
  const [year, _, day] = selectedDate.value.split('-')
  selectedDate.value = `${year}-${_month}-${day}`
}

const onSelectYear = (_year: string) => {
  year.value = _year;
  const [_, month, day] = selectedDate.value.split('-')
  selectedDate.value = `${_year}-${month}-${day}`
}

const onSubmit = async () => {
  try {
    isButtonSubmitDisabled.value = true
    const payload = {
      ...form,
      date: new Date(dayjs(selectedDate.value).toDate())
    }
    await timeTrackingStore.postTimeTracking(payload)
    emit('submit')
    isOpen.value = false
  }
  catch (error) {
    console.error(error)
  } finally {
    isButtonSubmitDisabled.value = false
  }
}

const resetDates = () => {
  onSelectDay(dayjs().format('YYYY-M-D'))
  onSelectMonth(dayjs().format('M'))
  onSelectYear(dayjs().format('YYYY'))
}

watch(() => isOpen.value, () => {
  if (isOpen.value) {
    form.task = ''
    form.hours = null
    form.date = new Date()
    resetDates()
  }
})

onMounted(() => {
  resetDates()
})
</script>

<template>
  <s-dialog v-model="isOpen">
    <template #title>Add Task</template>
    <template #content>
      <form class="d-flex flex-column flex-row-gap-8" @submit.prevent="onSubmit">
        <s-input v-model="form.task" placeholder="Enter task name" label="Task" />
        <s-input v-model="form.hours" placeholder="Enter hours spent on this task" label="Hours" />
        <div class="d-flex flex-column-gap-4 full-width">
          <s-select
            v-model="year"
            :items="years"
            class=" flex-grow-1"
            @update:model-value="onSelectYear"
          />
          <s-select
            v-model="month"
            :items="months"
            class="flex-grow-1"
            @update:model-value="onSelectMonth"
          />
        </div>
        <s-calendar
          v-model="selectedDate"
          :variant="TypeCalendarVariant.Compact"
          is-day-selectable
          is-weekdays-visible
          is-show-selected-day
          :weekdays-format="TypeWeekdaysFormat.Min"
          @select-day="onSelectDay"
        />
        <s-button type="submit" color="success" :disabled="isButtonSubmitDisabled">
          Add task
        </s-button>
      </form>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss">

</style>
