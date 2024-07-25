<script setup lang="ts">
  import appNav from "@/components/app-nav.vue";
  import appBar from "@/components/app-bar.vue";
  import useAuthStore from "@/store/auth";
  import useSettingsStore from "@/store/settings";
  import { onMounted } from "vue";

  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();

  onMounted(() => {
    settingsStore.setInitialSettings();
  });
</script>

<template>
  <div
    v-if="authStore.isUserLoggedIn"
    class="common-container pa-8"
  >
    <app-bar />
    <app-nav />
    <main>
      <Suspense>
        <div class="d-flex flex-column">
          <router-view />
        </div>
      </Suspense>
    </main>
    <s-toast />
  </div>
  <router-view v-else />
</template>

<style lang="scss">
  .common-container {
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
