<script setup lang="ts">
import useAuthStore from "@/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="d-flex align-center mb-8">
    <s-avatar rounded :src="authStore.user.photoURL" class="mr-8" />
    <h1>{{ authStore.user.displayName }}</h1>
  </div>
</template>

<style scoped lang="scss"></style>
