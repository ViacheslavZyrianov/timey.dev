<script setup lang="ts">
import dayjs from "dayjs";
import {computed, PropType} from "vue";
import {TypeCalendarVariant, TypeDatasetItemPerDay} from "@/components/shared/s-calendar/types";

const props = defineProps({
  day: {
    type: Object,
    default: () => ({})
  },
  isCurrentMonth: {
    type: Boolean,
    default: false
  },
  isToday: {
    type: Boolean,
    default: false
  },
  dataset: {
    type: Array as PropType<TypeDatasetItemPerDay[]>,
    default: () => []
  },
  variant: {
    type: String as PropType<TypeCalendarVariant>,
    default: TypeCalendarVariant.Default
  },
  isDaySelectable: {
    type: Boolean,
    default: false
  },
  formatDatasetItemElement: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select-day'])

const label = computed(() => dayjs(props.day.date).format("D"))

const datasetItemsCount = computed(() => props.dataset?.length)

const calendarDayClassList = computed(() => ({
  'calendar-day d-flex flex-column': true,
  'calendar-day--selectable': isCalendarDaySelectable.value,
  'calendar-day--not-current': !props.isCurrentMonth,
  'calendar-day--today': props.isToday,
  [`calendar-day--variant-${props.variant}`]: true
}))

const isDatasetExists = computed(() => !!props.dataset)

const minDatasetItems = computed(() => {
  return props.dataset?.slice(0, 2)
})

const moreDatasetItemsText = computed(() => `${datasetItemsCount.value - 2} items more...` || 'Loading...')

const isLessThenMinDatasetItems = computed(() => datasetItemsCount.value < 4)

const isCalendarDaySelectable = computed(() =>
  Boolean(
    props.variant === TypeCalendarVariant.Compact && props.isDaySelectable ||
    datasetItemsCount.value
  )
)

const formatDatasetItem = (datasetItem: TypeDatasetItemPerDay) => {
  return !props.formatDatasetItemElement || typeof datasetItem === 'string' ?
    datasetItem :
    props.formatDatasetItemElement.replace(/{(\w+)}/g, (_, key) => datasetItem[key]);
}

const onSelectDay = () => {
  if (isCalendarDaySelectable.value) emit('select-day')
}
</script>

<template>
  <li :class="calendarDayClassList" @click="onSelectDay">
    <div class="calendar-day-label">
      {{ label }}
    </div>
    <template v-if="dataset">
      <template v-if="isLessThenMinDatasetItems">
        <div
          v-for="datasetItem in dataset"
          class="calendar-day-dataset-item d-flex"
        >
          <div class="dataset-item-text">{{ formatDatasetItem(datasetItem) }}</div>
        </div>
      </template>
      <template v-else-if="isDatasetExists">
        <div
          v-for="datasetItem in minDatasetItems"
          class="calendar-day-dataset-item d-flex"
        >
          <div class="dataset-item-text">{{ formatDatasetItem(datasetItem) }}</div>
        </div>
        <div class="calendar-day-dataset-item calendar-day-dataset-item--more d-flex">
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
  transition: background-color .2s;
  will-change: background-color;

  &-label {
    margin-left: auto;
    margin-bottom: 4px;
  }

  &--not-current {
    color: #898f9b;
  }

  &--today {
    color: $c-primary;
    font-weight: 600;
  }

  &--variant {
    &-default {
      min-height: 112px;
      min-width: 96px;
      padding: 16px;
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
    }
  }

  &--selectable {
    cursor: pointer;

    &:hover{
      background-color: #f4f4f4;
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