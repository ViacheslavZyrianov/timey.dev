<script setup lang="ts">
  import { ref, computed, PropType, Ref, ComputedRef } from "vue";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import weekday from "dayjs/plugin/weekday";
  import weekOfYear from "dayjs/plugin/weekOfYear";
  import weekdays from "./weekdays.vue";
  import day from "./day.vue";
  import {
    TypeCalendarVariant,
    TypePreviousMonthDays,
    TypeWeekdaysFormat,
  } from "@/components/shared/types/calendar";
  import { ClassList } from "@/types/common";

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  dayjs.extend(customParseFormat);

  const props = defineProps({
    dataset: {
      type: Object,
      default: null,
    },
    formatDatasetItemElement: {
      type: String,
      default: "",
    },
    variant: {
      type: String as PropType<TypeCalendarVariant>,
      default: TypeCalendarVariant.Default,
    },
    isDaySelectable: {
      type: Boolean,
      default: false,
    },
    isWeekdaysVisible: {
      type: Boolean,
      default: false,
    },
    weekdaysFormat: {
      type: String as PropType<TypeWeekdaysFormat>,
      default: TypeWeekdaysFormat.Default,
    },
    isShowSelectedDay: {
      type: Boolean,
      default: false,
    },
  });

  const model = defineModel({
    type: String,
    default: dayjs().format("YYYY-M-D"),
  });

  const emit = defineEmits(["select-day"]);

  const today: Ref<string> = ref(dayjs().format("YYYY-M-D"));

  const month: ComputedRef<string> = computed(() => model.value.split("-")[1]);

  const year: ComputedRef<string> = computed(() => model.value.split("-")[0]);

  const numberOfDaysInMonth: ComputedRef<number | null> = computed(() =>
    model.value ? dayjs(model.value, "YYYY-M-D").daysInMonth() : null,
  );

  const previousMonthDays: ComputedRef<TypePreviousMonthDays> = computed(() => {
    const firstDayOfTheMonthWeekday = getWeekday.value(
      currentMonthDays.value[0].date,
    );
    const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(
      1,
      "month",
    );

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(
      currentMonthDays.value[0].date,
    )
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => ({
      date: dayjs(
        `${previousMonth.year()}-${
          previousMonth.month() + 1
        }-${previousMonthLastMondayDayOfMonth + index}`,
      ).format("YYYY-M-D"),
      isCurrentMonth: false,
    }));
  });

  const nextMonthDays: ComputedRef<TypePreviousMonthDays> = computed(() => {
    const lastDayOfTheMonthWeekday = getWeekday.value(
      `${year.value}-${month.value}-${currentMonthDays.value.length}`,
    );

    const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth || 0)].map(
      (_, index) => ({
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
        ).format("YYYY-M-D"),
        isCurrentMonth: false,
      }),
    );
  });

  const currentMonthDays: ComputedRef<TypePreviousMonthDays> = computed(() =>
    [...Array(Number(numberOfDaysInMonth.value))].map((day, index) => ({
      date: dayjs(`${year.value}-${month.value}-${index + 1}`).format(
        "YYYY-M-D",
      ),
      isCurrentMonth: true,
    })),
  );

  const days = computed(() => [
    ...previousMonthDays.value,
    ...currentMonthDays.value,
    ...nextMonthDays.value,
  ]);

  const isToday = computed(
    () =>
      (date: string): boolean =>
        date === today.value,
  );

  const getWeekday = computed(() => (date: string) => dayjs(date).weekday());

  const sCalendarClassList: ComputedRef<ClassList> = computed((): ClassList => {
    const classList = [];

    if (props.variant === TypeCalendarVariant.Default)
      classList.push("full-width");
    if (props.variant === TypeCalendarVariant.Compact)
      classList.push("width-fit-content");

    return classList;
  });

  const isReady: ComputedRef<boolean> = computed(() =>
    Boolean(numberOfDaysInMonth.value),
  );

  const generateDatasetPerDay = (date: string) =>
    props.dataset && props.dataset[date] ? props.dataset[date] : null;

  const onSelectDay = (date: string) => {
    model.value = date;
    emit("select-day", date);
  };
</script>

<template>
  <s-card
    v-if="isReady"
    :class="sCalendarClassList"
    padding="0"
    height="100%"
  >
    <template #content>
      <div class="d-flex flex-column height-100-p">
        <weekdays
          v-if="isWeekdaysVisible"
          :variant="variant"
          :weekdays-format="weekdaysFormat"
        />
        <ol class="days-grid flex-grow-1">
          <day
            v-for="dayItem in days"
            :key="dayItem.date"
            :day="dayItem"
            :is-today="isToday(dayItem.date)"
            :is-current-month="dayItem.isCurrentMonth"
            :is-day-selectable="isDaySelectable"
            :is-show-selected-day="isShowSelectedDay"
            :selected-day="model"
            :dataset="generateDatasetPerDay(dayItem.date)"
            :variant="variant"
            :format-dataset-item-element="formatDatasetItemElement"
            @select-day="onSelectDay(dayItem.date)"
          />
        </ol>
      </div>
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
