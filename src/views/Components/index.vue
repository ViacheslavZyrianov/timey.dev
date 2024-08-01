<script setup lang="ts"></script>

<template>
  <div class="d-flex flex-column mb-16">
    <component
      :is="`h${header}`"
      v-for="header in 3"
      :key="`header-${header}`"
      class="mb-4"
    >
      Header {{ header }}
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
