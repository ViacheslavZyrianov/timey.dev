<script setup lang="ts">
import appNav from "@/components/app-nav.vue";
import appBar from "@/components/app-bar.vue";
import useAuthStore from "@/store/auth";
import { computed, ComputedRef } from "vue";
import { RouteLocationRaw } from "vue-router";

const authStore = useAuthStore();

const backLink: ComputedRef<RouteLocationRaw> = computed(() => {
  return {
    path: window.history.state.back,
  };
});
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
        <div class="d-flex flex-column">
          <s-button
            icon="mdiArrowLeft"
            variant="text"
            size="small"
            class="mr-auto mb-16"
            :to="backLink"
          >
            Back
          </s-button>
          <router-view />
        </div>
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
