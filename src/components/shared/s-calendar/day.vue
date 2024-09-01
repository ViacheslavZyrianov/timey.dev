<script setup lang="ts">
  import dayjs from "dayjs";
  import { computed, ComputedRef, PropType } from "vue";
  import {
    TypeCalendarVariant,
    TypeDatasetItemPerDay,
  } from "@/components/shared/types/calendar";
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
    dataset: {
      type: Array as PropType<TypeDatasetItemPerDay[]>,
      default: () => [],
    },
    variant: {
      type: String as PropType<TypeCalendarVariant>,
      default: TypeCalendarVariant.Default,
    },
    isDaySelectable: {
      type: Boolean,
      default: false,
    },
    formatDatasetItemElement: {
      type: String,
      default: "",
    },
    isShowSelectedDay: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["select-day"]);

  const label = computed(() => dayjs(props.day.date).format("D"));

  const datasetItemsCount = computed(() => props.dataset?.length);

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

  const isDatasetExists = computed(() => !!props.dataset);

  const minDatasetItems = computed(() => {
    return props.dataset?.slice(0, 2);
  });

  const moreDatasetItemsText = computed(
    () => `${datasetItemsCount.value - 2} items more...`,
  );

  const isLessThenMinDatasetItems = computed(() => datasetItemsCount.value < 4);

  const isCalendarDaySelectable = computed(() =>
    Boolean(
      props.isCurrentMonth &&
        ((props.variant === TypeCalendarVariant.Compact &&
          props.isDaySelectable) ||
          datasetItemsCount.value > 0),
    ),
  );

  const formatDatasetItem = (datasetItem: TypeDatasetItemPerDay) => {
    return !props.formatDatasetItemElement || typeof datasetItem === "string"
      ? datasetItem
      : props.formatDatasetItemElement.replace(
          /{(\w+)}/g,
          (_, key) => datasetItem[key],
        );
  };

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
    <template v-if="dataset">
      <template v-if="isLessThenMinDatasetItems">
        <div
          v-for="(datasetItem, index) in dataset"
          :key="`${index}-${day.date}`"
          class="calendar-day-dataset-item d-flex"
        >
          <div class="dataset-item-text">
            {{ formatDatasetItem(datasetItem) }}
          </div>
        </div>
      </template>
      <template v-else-if="isDatasetExists">
        <div
          v-for="(datasetItem, index) in minDatasetItems"
          :key="`${index}-${day.date}`"
          class="calendar-day-dataset-item d-flex"
        >
          <div class="dataset-item-text">
            {{ formatDatasetItem(datasetItem) }}
          </div>
        </div>
        <div
          class="calendar-day-dataset-item calendar-day-dataset-item--more d-flex"
        >
          <div class="dataset-item-text">{{ moreDatasetItemsText }}</div>
        </div>
      </template>
    </template>
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

    &-dataset-item {
      font-size: 10px;
      padding: 4px;
      background-color: lighten($c-info, 35%);
      margin-bottom: 4px;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      &--more {
        background-color: transparent;
        color: #898f9b;
      }

      .dataset-item {
        &-text {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
