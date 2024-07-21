<script setup lang="ts">
  import { computed, ref, Ref } from "vue";

  const props = defineProps({
    src: {
      type: String,
      default: "",
      required: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 64,
    },
  });

  const loadingState: Ref<"loading" | "loaded" | "error"> = ref("loading");

  const style = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
  }));

  const classList = computed(() => ({
    [`s-avatar s-avatar--${loadingState.value}`]: true,
    rounded: props.rounded,
  }));

  const isLoading = computed(() => loadingState.value === "loading");

  const isError = computed(() => loadingState.value === "error");

  const isLoaded = computed(() => loadingState.value === "loaded");

  const onImageLoad = () => {
    loadingState.value = "loaded";
  };

  const onImageLoadError = () => {
    loadingState.value = "error";
  };
</script>

<template>
  <div
    :style="style"
    :class="classList"
  >
    <s-loader
      v-show="isLoading"
      size="small"
    />
    <s-icon
      v-show="isError"
      :size="24"
      color="#f37973"
      icon="mdiImageBroken"
    />
    <img
      v-show="isLoaded"
      :src="src"
      alt="Avatar"
      @load="onImageLoad"
      @error="onImageLoadError"
    />
  </div>
</template>

<style lang="scss" scoped>
  .s-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &--loading {
      background-color: #ffffff;
      border: 1px solid $c-primary;
    }

    &--error {
      background-color: lighten($c-error, 25%);
      border: 1px solid $c-error;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.rounded {
      border-radius: 8px;
    }
  }
</style>
