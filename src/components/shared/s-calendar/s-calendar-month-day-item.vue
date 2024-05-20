<script setup lang="ts">
import dayjs from "dayjs";
import {computed} from "vue";

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
  task: {
    type: Object,
    default: () => ({})
  },
})

const label = computed(() => dayjs(props.day.date).format("D"))

const calendarDayClassList = computed(() => ({
  'calendar-day d-flex flex-column': true,
  'calendar-day--not-current': !props.isCurrentMonth,
  'calendar-day--today': props.isToday
}))

const isTasksExist = computed(() => !!props.task?.tasks)

const minTasks = computed(() => {
  return props.task?.tasks?.slice(0, 2)
})

const moreTasksText = computed(() => `${props.task?.tasks?.length - 2} tasks more...` || 'Loading...')

const isLessThenMinTasks = computed(() => props.task?.tasks?.length < 4)
</script>

<template>
  <li :class="calendarDayClassList">
    <div class="calendar-day-label">
      {{ label }}
    </div>
    <template v-if="isLessThenMinTasks">
      <div
        v-for="taskItem in task.tasks"
        class="calendar-day-task d-flex"
      >
        <div class="task-hours mr-2">{{ taskItem.hours }}</div>
        <div class="task-text">{{ taskItem.task }}</div>
      </div>
    </template>
    <template v-else-if="isTasksExist">
      <div
        v-for="taskItem in minTasks"
        class="calendar-day-task d-flex"
      >
        <div class="task-hours mr-2">{{ taskItem.hours }}</div>
        <div class="task-text">{{ taskItem.task }}</div>
      </div>
      <div class="calendar-day-task calendar-day-task--more d-flex">
        <div class="task-text">{{ moreTasksText }}</div>
      </div>
    </template>
  </li>
</template>

<style scoped lang="scss">
.calendar-day {
  position: relative;
  display: flex;
  min-height: 112px;
  min-width: 96px;
  padding: 16px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
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

  &:hover {
    background-color: #f4f4f4;
  }

  &-task {
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

    .task {
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
