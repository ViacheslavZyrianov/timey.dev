<script setup lang="ts">
import { computed } from 'vue'
import appNav from '@/components/app-nav.vue'
import appBar from '@/components/app-bar.vue'
import useAuthStore from '@/store/auth'

const authStore = useAuthStore()

const mainClassList = computed(() => ({
  'align-center justify-center': !authStore.isUserLoggedIn
}))
</script>

<template>
  <div class="grid-container pa-8">
    <app-bar />
    <app-nav v-if="authStore.isUserLoggedIn" />
    <main
      class="d-flex flex-grow-1"
      :class="mainClassList"
    >
      <Suspense>
        <router-view />
      </Suspense>
    </main>
  </div>
</template>

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 256px 16px auto;
  grid-template-rows: auto 16px 1fr;
  grid-template-areas:
    "app-bar app-bar app-bar"
    ". . ."
    "app-nav . main";
  height: 100%;
}
main {
  grid-area: main;
}
</style>
