<script setup lang="ts">
import dayjs from "dayjs";
import {computed, ref, Ref} from "vue";

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

const isDialogOpened: Ref<boolean> = ref(false)

const label = computed(() => dayjs(props.day.date).format("D"))

const tasksCount = computed(() => props.task?.tasks?.length)

const calendarDayClassList = computed(() => ({
  'calendar-day d-flex flex-column': true,
  'calendar-day--not-current': !props.isCurrentMonth,
  'calendar-day--today': props.isToday,
  'calendar-day--has-tasks': !!tasksCount.value
}))

const isTasksExist = computed(() => !!props.task?.tasks)

const minTasks = computed(() => {
  return props.task?.tasks?.slice(0, 2)
})

const moreTasksText = computed(() => `${tasksCount.value - 2} tasks more...` || 'Loading...')

const isLessThenMinTasks = computed(() => tasksCount.value < 4)

const onSelectDay = () => {
  if (!tasksCount.value) return
  isDialogOpened.value = true;
}
</script>

<template>
  <li :class="calendarDayClassList" @click="onSelectDay">
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

  <s-dialog v-model="isDialogOpened">
    <template #title>
      {{ dayjs(day.date).format('DD MMMM YYYY') }}
    </template>
    <template #content>
      <div
        v-for="taskItem in task.tasks"
        :key="taskItem.id"
        class="task mb-4"
      >
        <div class="d-flex align-center">
          Hours: {{taskItem.hours}}
        </div>
        <div class="d-flex align-center">
          Task: {{ taskItem.task }}
        </div>
      </div>
    </template>
  </s-dialog>
</template>

<style scoped lang="scss">
.calendar-day {
  position: relative;
  display: flex;
  min-height: 112px;
  min-width: 96px;
  padding: 16px;
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

  &--has-tasks {
    cursor: pointer;
  }

  &:hover{
    background-color: #f4f4f4;
  }

  &:hover:not(.calendar-day--has-tasks) {
    background-color: #ffffff;
  }

  &:not(.calendar-day--has-tasks) {
    cursor: default;
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
