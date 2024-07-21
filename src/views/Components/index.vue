<script setup lang="ts"></script>

<template>
  <div class="d-flex flex-column mb-16">
    <component
      :is="`h${header}`"
      v-for="header in 6"
      :key="`header-${header}`"
      class="mb-4"
    >
      Header {{ header }}
    </component>
  </div>
  <div class="d-flex flex-column mb-16">
    <component
      :is="`h${header + 3}`"
      v-for="header in 3"
      :key="`subheader-${header + 3}`"
      :class="`mb-4 subheader-${header + 3}`"
    >
      Subheader {{ header + 3 }}
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
