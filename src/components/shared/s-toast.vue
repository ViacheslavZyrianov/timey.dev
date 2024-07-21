<script setup lang="ts">
  import { computed, ComputedRef, ref, Ref, watch } from "vue";
  import { useEventBus } from "@vueuse/core";
  import {
    ToastStatus,
    TypeToastPayload,
  } from "@/components/shared/types/toast";

  const eventBus = useEventBus<string>("toast");

  const props = defineProps({
    timeout: {
      type: Number,
      default: 3000,
    },
  });

  const isToastVisible: Ref<boolean> = ref(false);
  const toast: Ref<TypeToastPayload> = ref({
    text: "toast",
    status: ToastStatus.INFO,
  });

  eventBus.on((_, payload: TypeToastPayload) => {
    isToastVisible.value = true;
    toast.value = payload;
  });

  const sToastClassList: ComputedRef<Record<string, string | boolean>> =
    computed(() => ({
      [`s-toast s-toast--${toast.value.status} d-flex align-center `]: true,
      "s-toast--visible": isToastVisible.value,
    }));

  const toastIcon: ComputedRef<string> = computed(() => {
    switch (toast.value.status) {
      case ToastStatus.INFO:
        return "mdiInformationOutline";
      case ToastStatus.SUCCESS:
        return "mdiCheckCircleOutline";
      case ToastStatus.WARNING:
        return "mdiAlert";
      case ToastStatus.ERROR:
        return "mdiAlertCircleOutline";
      default:
        return "mdiInformationOutline";
    }
  });

  watch(
    () => isToastVisible.value,
    () => {
      if (isToastVisible.value) {
        setTimeout(() => {
          isToastVisible.value = false;
        }, props.timeout);
      }
    },
  );
</script>

<template>
  <div :class="sToastClassList">
    <s-icon
      :icon="toastIcon"
      :size="20"
      class="flex-shrink-0 mr-8"
    />
    <div class="s-toast-text">{{ toast.text }}</div>
  </div>
</template>

<style scoped lang="scss">
  .s-toast {
    position: fixed;
    right: 32px;
    bottom: 32px;
    max-width: 50%;
    border-radius: 8px;
    padding: 16px 24px;
    color: #ffffff;
    background-color: #aeaeae;
    border-width: 1px;
    border-style: solid;
    transition:
      transform 0.3s,
      opacity 0.3s,
      visibility 0.3s;
    opacity: 0;
    visibility: hidden;
    transform: translateY(50%);

    &--info {
      color: $c-info;
      border-color: $c-info;
      background-color: lighten($c-info, 35%);
    }

    &--success {
      color: $c-success;
      border-color: $c-success;
      background-color: lighten($c-success, 45%);
    }

    &--warning {
      color: $c-warning;
      border-color: $c-warning;
      background-color: lighten($c-warning, 35%);
    }

    &--error {
      color: $c-error;
      border-color: $c-error;
      background-color: lighten($c-error, 25%);
    }

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .s-toast-text {
      color: #323232;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>
