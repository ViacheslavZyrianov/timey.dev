<script setup lang="ts">
import {defineModel, reactive, ref, Ref} from "vue";
import {TypeTimeTrackingItemAdd} from "@/types/time-tracking";
import useTimeTrackingStore from "@/store/timeTracking";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {TypeCalendarVariant, TypeWeekdaysFormat} from "@/components/shared/s-calendar/types";

dayjs.extend(customParseFormat)

const emit = defineEmits(['submit'])

const timeTrackingStore = useTimeTrackingStore()

const isOpen = defineModel()
const form: TypeTimeTrackingItemAdd = reactive({
  task: "",
  hours: null,
  date: dayjs().format('DD.MM.YYYY'),
})
const isButtonSubmitDisabled: Ref<boolean> = ref(false)

const onSelectDay = (date: string) => {
  form.date = dayjs(date).format('DD.MM.YYYY')
}

const onSubmit = async () => {
  try {
    isButtonSubmitDisabled.value = true
    await timeTrackingStore.postTimeTracking({
      ...form,
      date: new Date(dayjs(form.date, 'DD-MM-YYYY').toDate())
    })
    emit('submit')
    isOpen.value = false
  }
  catch (error) {
    console.error(error)
  } finally {
    isButtonSubmitDisabled.value = false
  }
}
</script>

<template>
  <s-dialog v-model="isOpen">
    <template #title>Add Task</template>
    <template #content>
      <form class="d-flex flex-column flex-row-gap-8" @submit.prevent="onSubmit">
        <s-input v-model="form.task" placeholder="Enter task name" label="Task" />
        <s-input v-model="form.hours" placeholder="Enter hours spent on this task" label="Hours" />
        <s-input v-model="form.date" placeholder="DD.MM.YYYY" label="Date (DD.MM.YYYY)" />
        <s-calendar
          :variant="TypeCalendarVariant.Compact"
          is-day-selectable
          is-weekdays-visible
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
