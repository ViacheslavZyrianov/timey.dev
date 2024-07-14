<script setup lang="ts">
import {ref, computed, PropType, Ref} from 'vue'
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekdays from './weekdays.vue';
import day from './day.vue';
import {TypeCalendarVariant, TypePreviousMonthDays, TypeWeekdaysFormat} from "@/components/shared/s-calendar/types";

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(customParseFormat)

const model = defineModel({
  default: '',
  type: String
})

const props = defineProps({
  dataset: {
    type: Object,
    default: null
  },
  formatDatasetItemElement: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<TypeCalendarVariant>,
    default: TypeCalendarVariant.Default
  },
  isDaySelectable: {
    type: Boolean,
    default: false
  },
  isWeekdaysVisible: {
    type: Boolean,
    default: false
  },
  weekdaysFormat: {
    type: String as PropType<TypeWeekdaysFormat>,
    default: TypeWeekdaysFormat.Default
  },
  isShowSelectedDay: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['select-day'])

const today: Ref<string> = ref(dayjs().format("YYYY-MM-DD"))

const month: Ref<string> = computed(() => model.value.split('-')[1])

const year: Ref<string> = computed(() => model.value.split('-')[0])

const numberOfDaysInMonth: Ref<number> = computed(() => dayjs(model.value, 'YYYY-M-D').daysInMonth())

const previousMonthDays: Ref<TypePreviousMonthDays> = computed(() => {
  const firstDayOfTheMonthWeekday = getWeekday.value(
    currentMonthDays.value[0]?.date
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
    currentMonthDays.value[0]?.date
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
    (_, index) => {
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

  return [...Array(visibleNumberOfDaysFromNextMonth || 0)].map((_, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false
    };
  });
})

const currentMonthDays = computed(() => [...Array(numberOfDaysInMonth.value || 0)].map((day, index) => {
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

const isToday = computed(() => (date: string) => date === today.value)

const getWeekday = computed(() => (date: string) => dayjs(date).weekday())

const sCalendarClassList = computed(() => {
  const classList = []

  if (props.variant === TypeCalendarVariant.Default) classList.push('full-width')
  if (props.variant === TypeCalendarVariant.Compact) classList.push('width-fit-content')

  return classList
})

const generateDatasetPerDay = (date: string) => props.dataset && props.dataset[date] ? props.dataset[date] : null
</script>

<template>
  <s-card :class="sCalendarClassList" padding="0">
      <template #content>
        <weekdays
          v-if="isWeekdaysVisible"
          :variant="variant"
          :weekdays-format="weekdaysFormat"
        />
        <ol class="days-grid">
          <day
            v-for="day in days"
            :key="day.date"
            :day="day"
            :is-today="isToday(day.date)"
            :is-current-month="day.isCurrentMonth"
            :is-day-selectable="isDaySelectable"
            :is-show-selected-day="isShowSelectedDay"
            :selected-day="day.date"
            :dataset="generateDatasetPerDay(day.date)"
            :variant="variant"
            :format-dataset-item-element="formatDatasetItemElement"
            @select-day="emit('select-day', day.date)"
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
