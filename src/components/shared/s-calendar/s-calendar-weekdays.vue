<script setup lang="ts">
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<template>
  <ol class="weekdays">
    <li
      v-for="weekday in WEEKDAYS"
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
  background-color: $c-primary;

  .weekday {
    text-align: center;
    color: #ffffff;
    font-weight: 600;
  }
}
</style>
