<script setup lang="ts">
  import { computed, ComputedRef, PropType } from "vue";
  import {
    TypeCalendarVariant,
    TypeWeekdaysFormat,
  } from "@/components/shared/types/calendar";
  import dayjs from "dayjs";
  import localeData from "dayjs/plugin/localeData";
  import { ClassList } from "@/types/common";
  import useSettingsStore from "@/store/settings";

  dayjs.extend(localeData);

  const props = defineProps({
    variant: {
      type: String as PropType<TypeCalendarVariant>,
      default: TypeCalendarVariant.Default,
    },
    weekdaysFormat: {
      type: String as PropType<TypeWeekdaysFormat>,
      default: TypeWeekdaysFormat.Default,
    },
  });

  const settingsStore = useSettingsStore();

  const weekdays: ComputedRef<string[]> = computed(() => {
    let days: string[];

    if (props.weekdaysFormat === TypeWeekdaysFormat.Short)
      days = dayjs().localeData().weekdaysShort();
    else if (props.weekdaysFormat === TypeWeekdaysFormat.Min)
      days = dayjs().localeData().weekdaysMin();
    else days = dayjs().localeData().weekdays();

    days = [...days.slice(1), days[0]];

    return settingsStore.settings.calendar.isShowWeekends
      ? days
      : days.slice(0, 5);
  });

  const weekdaysClassList: ComputedRef<ClassList> = computed(
    (): ClassList => [
      {
        ["weekdays--has-weekends"]:
          settingsStore.settings.calendar.isShowWeekends,
      },
      {
        ["weekdays--no-weekends"]:
          !settingsStore.settings.calendar.isShowWeekends,
      },
    ],
  );
</script>

<template>
  <ol
    class="weekdays"
    :class="weekdaysClassList"
  >
    <li
      v-for="weekday in weekdays"
      :key="weekday"
      class="weekday"
    >
      {{ weekday }}
    </li>
  </ol>
</template>

<style scoped lang="scss">
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 16px 0;
    background-color: #aeaeae;
    position: sticky;
    top: 0;
    z-index: 1;

    .weekday {
      text-align: center;
      color: #ffffff;
      font-weight: 600;
      user-select: none;
    }

    &--has-weekends {
      grid-template-columns: repeat(7, 1fr);
    }

    &--no-weekends {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
