<script setup lang="ts">
import useAuthStore from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const navList = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: 'mdiViewDashboardOutline'
  },
  {
    title: 'Teams',
    to: '/teams',
    icon: 'mdiAccountGroupOutline'
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'mdiCogOutline'
  }
]

async function onLogout() {
  await authStore.logout()
  await router.push('/auth')
}
</script>

<template>
  <div class="sider d-flex flex-column">
    <div class="profile d-flex align-center">
      <s-avatar
        :src="authStore.user.photoURL"
        :size="48"
        class="avatar"
      />
      <div class="display-name">
        {{ authStore.user.displayName }}
      </div>
    </div>
    <nav class="d-flex flex-column flex-grow-1">
      <router-link
        v-for="{ title, icon, to } in navList"
        :key="to"
        :to="to"
        block
        class="nav-button d-flex align-center"
      >
        <s-icon
          :icon="icon"
          :size="24"
          class="nav-icon"
        />
        <span class="nav-title">{{ title }}</span>
      </router-link>
      <s-button
        class="nav-logout"
        color="error"
        icon="mdiLogout"
        size="small"
        title="Logout"
        type="outlined"
        @click="onLogout"
      />
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sider {
  padding: 16px;
  width: 256px;

  .profile {
    margin-bottom: 16px;

    .avatar {
      margin-right: 16px;
      flex-shrink: 0;
    }

    .display-name {
      color: $c-primary;
      overflow: hidden;
      text-wrap: nowrap;
      text-overflow: ellipsis;
    }
  }

  .nav-button {
    padding: 16px;
    margin-bottom: 8px;
    color: #898f9b;
    transition: color .3s, background .3s;
    will-change: color, background;
    border-radius: 8px;

    &.router-link-active {
      color: #fff;
      background-color: $c-primary;

      &:hover {
        background-color: $c-primary;
      }
    }

    &:hover {
      background-color: lighten($c-primary, 45%);
    }
  }

  .nav-title {
    font-size: 14px;
  }

  .nav-icon {
    margin-right: 8px;
  }

  .nav-logout {
    margin-top: auto;
  }
}
</style>
