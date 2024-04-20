<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  description: '',
})
</script>

<template>
<div class="d-flex direction-column">
  <s-input v-model="form.name" />
  <s-input v-model="form.description" />
  <s-button title="Create new team" />
</div>
</template>

<style scoped lang="scss">

</style>
