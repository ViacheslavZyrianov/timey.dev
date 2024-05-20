<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import { useRoute } from 'vue-router'
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(customParseFormat)

const props = defineProps({
  tasks: {
    type: Object,
    default: () => ({})
  }
})

const route = useRoute()

const selectedDate = ref(dayjs())
const today = ref(dayjs().format("YYYY-MM-DD"))

const month = computed(() => Number(selectedDate.value.format("M")))

const year = computed(() => Number(selectedDate.value.format("YYYY")))

const numberOfDaysInMonth = computed(() => dayjs(selectedDate.value).daysInMonth())

const previousMonthDays = computed(() => {
  const firstDayOfTheMonthWeekday = getWeekday.value(
    currentMonthDays.value[0].date
  );
  const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(
    1,
    "month"
  );

  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays.value[0].date
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
    (day, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() +
          1}-${previousMonthLastMondayDayOfMonth + index}`
        ).format("YYYY-MM-DD"),
        isCurrentMonth: false
      };
    }
  );
})

const nextMonthDays = computed(() => {
  const lastDayOfTheMonthWeekday = getWeekday.value(
    `${year.value}-${month.value}-${currentMonthDays.value.length}`
  );

  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false
    };
  });
})

const currentMonthDays = computed(() => [...Array(numberOfDaysInMonth.value)].map((day, index) => {
  return {
    date: dayjs(`${year.value}-${month.value}-${index + 1}`).format("YYYY-MM-DD"),
    isCurrentMonth: true
  };
}))

const days = computed(() => [
  ...previousMonthDays.value,
  ...currentMonthDays.value,
  ...nextMonthDays.value,
])

const isToday = computed(() => (date) => date === today.value)

const getWeekday = computed(() => (date) => dayjs(date).weekday())

watch(() => route.params, async () => {
  selectedDate.value = dayjs(`${route.params.year}-${route.params.month}-01`, 'YYYY-M-D')
}, {
  immediate: true,
})
</script>

<template>
  <s-card class="calendar-month" padding="0">
      <template #content>
        <s-calendar-weekdays />
        <ol class="days-grid">
          <s-calendar-month-day-item
            v-for="day in days"
            :key="day.date"
            :day="day"
            :is-today="isToday(day.date)"
            :is-current-month="day.isCurrentMonth"
            :task="tasks[day.date]"
          />
        </ol>
      </template>
  </s-card>
</template>

<style scoped lang="scss">
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  user-select: none;
}
</style>
