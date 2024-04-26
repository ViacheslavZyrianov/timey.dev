<script setup lang="ts">
import useAuthStore from '@/store/auth'

const authStore = useAuthStore()
</script>

<template>
  <s-card class="full-width height-fit-content">
    <template #title>User ID</template>
    <template #content>
      {{authStore.user.uid}}
    </template>
  </s-card>
</template>

<style scoped lang="scss">

</style>
