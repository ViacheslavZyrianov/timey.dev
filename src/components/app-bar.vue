<script setup lang="ts">
  import { useEventBus } from "@vueuse/core";

  const eventBus = useEventBus<string>("dialogAddTask");

  const onOpenDialogAddTask = () => {
    eventBus.emit("dialogAddTask");
  };
</script>

<template>
  <div class="app-bar d-flex align-items-center flex-column-gap-8 pa-8">
    <div class="d-flex align-baseline position-relative">
      <img
        src="@/assets/img/logo-text.svg"
        alt="Logo"
        height="100%"
      />
      <div class="version">pre-alpha</div>
    </div>
    <s-button
      icon="mdiPlus"
      class="ml-auto"
      @click="onOpenDialogAddTask"
    >
      Add task
    </s-button>
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

  .version {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(calc(100% + 8px));
    background-color: lighten($c-primary, 45%);
    color: $c-primary;
    border: 1px solid $c-primary;
    font-size: 12px;
    line-height: 16px;
    height: 24px;
    padding: 4px 8px;
    text-align: center;
    border-radius: 4px;
    user-select: none;
  }
</style>
