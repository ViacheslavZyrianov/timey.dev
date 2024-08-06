<script setup lang="ts">
  import appNav from "@/components/app-nav.vue";
  import appBar from "@/components/app-bar.vue";
  import useAuthStore from "@/store/auth";
  import useSettingsStore from "@/store/settings";
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";

  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();
  const route = useRoute();

  onMounted(() => {
    settingsStore.setInitialSettings();
  });
</script>

<template>
  <div
    v-if="authStore.isUserLoggedIn"
    class="common-container pa-8"
  >
    <app-bar class="mr-8 ml-16" />
    <app-nav />
    <main class="py-16 pl-16 pr-8">
      <Suspense>
        <div class="d-flex flex-column flex-row-gap-8">
          <h1
            v-if="route.meta.name"
            class="mb-16"
          >
            {{ route.meta.name }}
          </h1>
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
    grid-template-columns: 256px auto 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "app-nav . app-bar"
      "app-nav . main"
      "app-nav . main";
    height: 100%;
  }
  main {
    grid-area: main;
  }
</style>
