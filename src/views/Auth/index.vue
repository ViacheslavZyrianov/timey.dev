<script setup lang="ts">
  import useAuthStore from "@/store/auth";
  import { useRouter } from "vue-router";

  const authStore = useAuthStore();
  const router = useRouter();

  async function onAuthClick() {
    await authStore.googleAuth();
    router.push("dashboard");
  }
</script>

<template>
  <div class="page-auth">
    <div
      class="d-flex align-center justify-center flex-column width-50-vw height-100-vh"
    >
      <s-card padding="64px">
        <template #content>
          <img
            src="@/assets/img/auth.svg"
            alt="Auth"
            class="mb-32"
          />
          <s-button
            icon="mdiGoogle"
            width="100%"
            @click="onAuthClick"
          >
            Sign in with Google
          </s-button>
        </template>
      </s-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-auth {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
</style>
