<script setup lang="ts">
  import dayjs from "dayjs";
  import { computed, ComputedRef, PropType } from "vue";
  import { TypeCalendarVariant } from "@/components/shared/types/calendar";
  import { ClassList } from "@/types/common";

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
        props.variant === TypeCalendarVariant.Compact &&
        props.isDaySelectable,
    ),
  );

  const onSelectDay = () => {
    if (isCalendarDaySelectable.value && props.isCurrentMonth)
      emit("select-day");
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
    }

    &--variant {
      &-default {
        min-height: 112px;
        min-width: 96px;
        padding: 8px;

        .calendar-day {
          &-label {
            margin: 0 0 12px auto;
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
