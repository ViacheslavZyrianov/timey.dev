<script setup lang="ts">
  import appNav from "@/components/app-nav.vue";
  import appBar from "@/components/app-bar.vue";
  import useAuthStore from "@/store/auth";
  import useSettingsStore from "@/store/settings";
  import useTimeTrackingStore from "@/store/timeTracking";
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";
  import DialogAddTask from "@/common/dialogs/dialogAddTask.vue";

  const route = useRoute();
  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();
  const timeTrackingStore = useTimeTrackingStore();

  const fetchTimeTrackingForCurrentMonthAndYear = async () => {
    if (route.name === "timeTrackingYearMonth") {
      await timeTrackingStore.fetchTimeTracking(
        Number(route.params.month),
        Number(route.params.year),
        authStore.user.uid,
      );
    }
  };

  onMounted(() => {
    settingsStore.setInitialSettings();
  });
</script>

<template>
  <div
    v-if="authStore.isUserLoggedIn"
    class="common-container pa-8"
  >
    <app-bar class="mb-8" />
    <app-nav />
    <main class="pr-0 pb-0 pl-8">
      <Suspense>
        <div class="d-flex flex-column height-100-p">
          <router-view />
        </div>
      </Suspense>
    </main>

    <dialog-add-task @submit="fetchTimeTrackingForCurrentMonthAndYear" />

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
      "app-bar app-bar app-bar"
      "app-nav . main"
      "app-nav . main";
    height: 100%;
  }
  main {
    grid-area: main;
  }
</style>
