<script setup lang="ts">
import appNav from '@/components/app-nav.vue'
import appBar from '@/components/app-bar.vue'
import useAuthStore from '@/store/auth'

const authStore = useAuthStore()
</script>

<template>
  <div
    v-if="authStore.isUserLoggedIn"
    class="grid-container pa-8"
  >
    <app-bar />
    <app-nav />
    <main>
      <Suspense>
        <router-view />
      </Suspense>
    </main>
  </div>
  <router-view v-else />
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
