<script setup lang="ts">
  import useAuthStore from "@/store/auth";

  const authStore = useAuthStore();
</script>

<template>
  <div class="app-bar d-flex justify-end align-items-center pa-8">
    <img
      src="@/assets/img/logo.svg"
      alt="Logo"
      class="mr-auto"
    />
    <router-link
      to="/profile"
      class="profile d-flex align-center"
    >
      <div class="display-name mr-8">
        {{ authStore.user.displayName }}
      </div>
      <s-avatar
        :src="authStore.user.photoURL"
        :size="48"
        class="avatar"
      />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
  .app-bar {
    grid-area: app-bar;
    background-color: #fff;
    box-shadow: 0 0 16px 0 #d9d9d9;
    border-radius: 8px;
    height: 80px;
  }

  .profile {
    padding-left: 16px;
    transition:
      color 0.2s,
      background 0.2s;
    will-change: color, background;
    border-radius: 8px;

    .display-name {
      color: $c-primary;
      overflow: hidden;
      text-wrap: nowrap;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.2s;
      will-change: color;
    }

    .avatar {
      flex-shrink: 0;
    }

    &.router-link-active {
      background-color: $c-primary;

      &:hover {
        background-color: $c-primary;
      }

      .display-name {
        color: #ffffff;
      }
    }

    &:hover {
      background-color: lighten($c-primary, 45%);
    }
  }
</style>
