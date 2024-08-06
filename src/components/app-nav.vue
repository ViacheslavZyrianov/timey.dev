<script setup lang="ts">
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import useAuthStore from "@/store/auth";
  import useSettingsStore from "@/store/settings";
  import getCurrentHourInWords from "@/utils/getCurrentHourInWords";
  import { Color } from "@/types/common";
  import { ButtonVariant } from "@/components/shared/types/button";

  const router = useRouter();

  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();

  const navListDefault = [
    {
      title: "Profile",
      to: "/profile",
      icon: "mdiAccountOutline",
    },
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: "mdiViewDashboardOutline",
    },
    {
      title: "Time Tracking",
      to: "/time-tracking",
      icon: `mdiClockTime${getCurrentHourInWords()}Outline`,
    },
    {
      title: "Settings",
      to: "/settings",
      icon: "mdiCogOutline",
    },
  ];

  const navListTeamManager = [
    {
      title: "Profile",
      to: "/profile",
      icon: "mdiAccountOutline",
    },
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: "mdiViewDashboardOutline",
    },
    {
      title: "Time Tracking",
      to: "/time-tracking",
      icon: `mdiClockTime${getCurrentHourInWords()}Outline`,
    },
    {
      title: "Teams",
      to: "/teams",
      icon: "mdiAccountGroupOutline",
    },
    {
      title: "Settings",
      to: "/settings",
      icon: "mdiCogOutline",
    },
  ];

  const navList = computed(() =>
    settingsStore.settings.isTeamManager ? navListTeamManager : navListDefault,
  );

  async function onLogout() {
    await authStore.logout();
    await router.push("/auth");
  }
</script>

<template>
  <nav class="app-nav d-flex flex-column flex-grow-1 pa-8">
    <div class="logo d-flex align-baseline mb-8 px-8">
      <img
        src="@/assets/img/logo.svg"
        alt="Logo"
        class="mr-2"
      />
      imey
    </div>
    <router-link
      v-for="{ title, icon, to } in navList"
      :key="to"
      :to="to"
      block
      class="nav-button pa-8 mb8 d-flex align-center mb-8"
    >
      <s-icon
        :icon="icon"
        :size="24"
        class="nav-icon"
      />
      {{ title }}
    </router-link>
    <s-button
      class="nav-logout"
      :color="Color.Error"
      icon="mdiLogout"
      :variant="ButtonVariant.Outlined"
      @click="onLogout"
    >
      Logout
    </s-button>
  </nav>
</template>

<style lang="scss" scoped>
  .app-nav {
    grid-area: app-nav;
    width: 256px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 16px 0 #d9d9d9;

    .nav-button {
      color: #898f9b;
      transition:
        color 0.2s,
        background 0.2s;
      will-change: color, background;
      border-radius: 8px;

      &.router-link-active {
        color: #fff;
        background-color: $c-primary;

        &:hover {
          color: #fff;
          background-color: $c-primary;
        }
      }

      &:hover {
        color: $c-primary;
        background-color: lighten($c-primary, 45%);
      }
    }

    .nav-icon {
      margin-right: 8px;
    }

    .nav-logout {
      margin-top: auto;
    }
  }

  .logo {
    font-size: 32px;
    user-select: none;

    img {
      height: 48px;
    }
  }
</style>
