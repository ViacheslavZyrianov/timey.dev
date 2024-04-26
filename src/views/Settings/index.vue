<script setup lang="ts">
import useAuthStore from '@/store/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 flex-gap-8">
    <s-card class="full-width height-fit-content">
      <template #title>User ID</template>
      <template #content>
        {{ authStore.user.uid }}
      </template>
    </s-card>
  </div>
</template>

<style scoped lang="scss">

</style>
