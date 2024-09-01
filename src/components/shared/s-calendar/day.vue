<script setup lang="ts">
  import dayjs from "dayjs";
  import { computed, ComputedRef, PropType } from "vue";
  import { TypeCalendarVariant } from "@/components/shared/types/calendar";
  import { ClassList } from "@/types/common";
  import { TypeTaskInDayData } from "@/views/TimeTracking/types";

  const props = defineProps({
    day: {
      type: Object,
      default: () => ({}),
    },
    selectedDay: {
      type: String,
      default: "",
    },
    isCurrentMonth: {
      type: Boolean,
      default: false,
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as PropType<TypeCalendarVariant>,
      default: TypeCalendarVariant.Default,
    },
    isDaySelectable: {
      type: Boolean,
      default: false,
    },
    isShowSelectedDay: {
      type: Boolean,
      default: false,
    },
    tasks: {
      type: Array as PropType<TypeTaskInDayData[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(["select-day"]);

  const label = computed(() => dayjs(props.day.date).format("D"));

  const calendarDayClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      `calendar-day d-flex flex-column calendar-day--variant-${props.variant}`,
      { "calendar-day--selectable": isCalendarDaySelectable.value },
      { "calendar-day--not-current": !props.isCurrentMonth },
      { "calendar-day--today": props.isToday },
      {
        "calendar-day--selected":
          props.isShowSelectedDay && props.day.date === props.selectedDay,
      },
    ],
  );

  const isCalendarDaySelectable = computed(() =>
    Boolean(
      props.isCurrentMonth &&
        props.isDaySelectable &&
        (props.variant === TypeCalendarVariant.Compact || props.tasks.length),
    ),
  );

  const onSelectDay = () => {
    if (isCalendarDaySelectable.value && props.isCurrentMonth)
      emit("select-day");
  };

  const generateTotalTasksLabel = (tasksCount: number) =>
    tasksCount === 1 ? "task" : "tasks";

  const countTotalTime = (tasks: TypeTaskInDayData[]): string => {
    const totalMinutes = tasks.reduce(
      (sum: number, entry: TypeTaskInDayData) => {
        const hourInMinutes = parseInt(entry.hours, 10) * 60; // Convert hours to minutes
        const minutes = entry.minutes ? parseInt(entry.minutes, 10) : 0; // Convert minutes or default to 0
        return sum + hourInMinutes + minutes;
      },
      0,
    );

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return remainingMinutes === 0
      ? `${totalHours}h`
      : `${totalHours}h ${String(remainingMinutes).padStart(2, "0")}m`;
  };
</script>

<template>
  <li
    :class="calendarDayClassList"
    @click="onSelectDay"
  >
    <div class="calendar-day-label">
      <span>{{ label }}</span>
    </div>
    <div v-if="tasks?.length">
      <div class="mb-4 text-align-right">
        {{ tasks.length }} {{ generateTotalTasksLabel(tasks.length) }}
      </div>
      <div class="font-weight-700 text-align-right">
        {{ countTotalTime(tasks) }}
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
  .calendar-day {
    position: relative;
    display: flex;
    border: 1px solid #e6e6e6;
    transition: background-color 0.2s;
    will-change: background-color;

    &-label {
      margin-left: auto;
      margin-bottom: 4px;
      width: 18px;

      span {
        display: block;
        width: 100%;
        text-align: center;
      }
    }

    &-label {
      position: relative;

      span {
        position: relative;
      }
    }

    &--not-current {
      color: #898f9b;
      background-color: lighten(#898f9b, 40%);
    }

    &--variant {
      &-default {
        min-width: 96px;
        height: 90px;
        padding: 8px;

        .calendar-day-label {
          margin: 0 0 12px auto;
        }

        &.calendar-day--today {
          .calendar-day-label {
            color: #ffffff;
            font-weight: 600;
            text-align: center;

            &:before {
              content: "";
              display: block;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background-color: $c-primary;
              position: absolute;
              top: -4px;
              right: -2px;
            }
          }
        }
      }

      &-compact {
        min-height: 32px;
        min-width: 32px;
        padding: 16px;

        .calendar-day {
          &-label {
            text-align: center;
            margin: 0;
          }
        }

        &.calendar-day--today {
          .calendar-day-label {
            color: #ffffff;
            font-weight: 600;
            text-align: center;

            &:before {
              content: "";
              display: block;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background-color: $c-primary;
              position: absolute;
              top: -4px;
              right: -2px;
            }
          }
        }
      }
    }

    &--selectable {
      cursor: pointer;

      &:hover {
        background-color: #f4f4f4;
      }
    }

    &--selected {
      background-color: $c-primary;
      color: #ffffff;

      &:hover {
        background-color: $c-primary;
        color: #ffffff;
      }
    }
  }
</style>
