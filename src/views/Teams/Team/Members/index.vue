<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();
</script>

<template>
  <pre>{{ route.params }}</pre>
</template>

<style scoped lang="scss"></style>
