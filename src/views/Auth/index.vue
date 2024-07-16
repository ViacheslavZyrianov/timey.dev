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
    <s-card width="300px">
      <template #title>Authorize</template>
      <template #content>
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
