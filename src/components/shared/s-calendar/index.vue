<script setup lang="ts">
  import { ref, computed, PropType, Ref, ComputedRef } from "vue";
  import dayjs from "dayjs";
  import dayjsBusinessDays from "dayjs-business-days/index.min";
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
  import useSettingsStore from "@/store/settings";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  dayjs.extend(customParseFormat);
  dayjs.extend(dayjsBusinessDays);

  const props = defineProps({
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
    tasks: {
      type: Object as PropType<Record<string, TypeTaskInDayData[]>>,
      default: null,
    },
  });

  const model = defineModel({
    type: String,
    default: dayjs().format("YYYY-M-D"),
  });

  const emit = defineEmits(["select-day"]);

  const settingsStore = useSettingsStore();

  const today: Ref<string> = ref(dayjs().format("YYYY-M-D"));

  const month: ComputedRef<string> = computed(() => model.value.split("-")[1]);

  const year: ComputedRef<string> = computed(() => model.value.split("-")[0]);

  const numberOfDaysInMonth: ComputedRef<number | null> = computed(() => {
    if (model.value) {
      if (settingsStore.settings.calendar.isShowWeekends)
        return dayjs(model.value, "YYYY-M-D").daysInMonth();
      return dayjs().businessDaysInMonth().length;
    }
    return null;
  });

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
      ? (settingsStore.settings.calendar.isShowWeekends ? 7 : 4) -
        lastDayOfTheMonthWeekday
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
      classList.push("width-100-p");
    if (props.variant === TypeCalendarVariant.Compact)
      classList.push("width-fit-content");

    return classList;
  });

  const isReady: ComputedRef<boolean> = computed(() =>
    Boolean(numberOfDaysInMonth.value),
  );

  const daysClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      {
        ["days-grid--has-weekends"]:
          settingsStore.settings.calendar.isShowWeekends,
      },
      {
        ["days-grid--no-weekends"]:
          !settingsStore.settings.calendar.isShowWeekends,
      },
    ],
  );

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
  >
    <template #content>
      <div class="d-flex flex-column">
        <weekdays
          v-if="isWeekdaysVisible"
          :variant="variant"
          :weekdays-format="weekdaysFormat"
        />
        <ol
          :class="daysClassList"
          class="days-grid flex-grow-1"
        >
          <day
            v-for="dayItem in days"
            :key="dayItem.date"
            :day="dayItem"
            :is-today="isToday(dayItem.date)"
            :is-current-month="dayItem.isCurrentMonth"
            :is-day-selectable="isDaySelectable"
            :is-show-selected-day="isShowSelectedDay"
            :selected-day="model"
            :variant="variant"
            :tasks="tasks && tasks[dayItem.date]"
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
    user-select: none;

    &--has-weekends {
      grid-template-columns: repeat(7, 1fr);
    }

    &--no-weekends {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
