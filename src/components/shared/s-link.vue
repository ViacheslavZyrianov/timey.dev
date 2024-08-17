<script setup lang="ts">
  defineProps({
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: "",
    },
  });
</script>

<template>
  <router-link
    v-if="to"
    :to="to"
  >
    <slot />
  </router-link>
  <a
    v-else-if="href"
    :href="href"
  >
    <slot />
  </a>
</template>

<style scoped lang="scss">
  a {
    position: relative;
    color: $c-primary;
    transition: color 0.3s;

    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      display: block;
      height: 1px;
      width: 100%;
      background-color: $c-primary;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }
</style>
