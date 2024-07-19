<script setup lang="ts">
  import useAuthStore from "@/store/auth";
  import useSettingsStore from "@/store/settings";

  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();

  const onChangeSwitchTeamManager = (isTeamManager: boolean) => {
    settingsStore.setSetting("isTeamManager", isTeamManager);
  };
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 flex-row-gap-8">
    <s-card class="full-width height-fit-content">
      <template #title>User ID</template>
      <template #content>
        {{ authStore.user.uid }}
      </template>
    </s-card>
    <s-card class="full-width height-fit-content">
      <template #title>Team Manager Mode</template>
      <template #content>
        <div class="d-flex justify-space-between">
          <span>Are you team manager?</span>
          <s-switch
            v-model="settingsStore.settings.isTeamManager"
            @update:model-value="onChangeSwitchTeamManager"
          >
            <template #prepended-text>No</template>
            <template #appended-text>Yes</template>
          </s-switch>
        </div>
      </template>
    </s-card>
  </div>
</template>

<style scoped lang="scss"></style>
