<script setup lang="ts">
  import { computed, ComputedRef, PropType } from "vue";
  import {
    TypeCalendarVariant,
    TypeWeekdaysFormat,
  } from "@/components/shared/types/calendar";
  import dayjs from "dayjs";
  import localeData from "dayjs/plugin/localeData";

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

  const weekdays: ComputedRef<string[]> = computed(() => {
    let days: string[];

    if (props.weekdaysFormat === TypeWeekdaysFormat.Short)
      days = dayjs().localeData().weekdaysShort();
    else if (props.weekdaysFormat === TypeWeekdaysFormat.Min)
      days = dayjs().localeData().weekdaysMin();
    else days = dayjs().localeData().weekdays();

    days.push(days.shift() as string);

    return days;
  });
</script>

<template>
  <ol class="weekdays">
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

    .weekday {
      text-align: center;
      color: #ffffff;
      font-weight: 600;
    }
  }
</style>
