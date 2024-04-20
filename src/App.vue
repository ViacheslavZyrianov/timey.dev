<script setup lang="ts">
import { computed } from 'vue'
import sider from '@/components/sider.vue'
import useAuthStore from '@/store/auth'

const authStore = useAuthStore()

const mainClassList = computed(() => ({
  'align-center justify-center': !authStore.isUserLoggedIn
}))
</script>

<template>
  <div class="d-flex">
        <sider v-if="authStore.isUserLoggedIn" />
        <main
          class="main d-flex flex-grow-1"
          :class="mainClassList"
        >
          <Suspense>
            <router-view />
          </Suspense>
        </main>
  </div>
</template>

<style lang="scss">
@import url('./assets/scss/global.scss');
</style>
