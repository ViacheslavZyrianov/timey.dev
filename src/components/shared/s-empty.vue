<script setup lang="ts"></script>

<template>
  <s-card
    height="400px"
    class="s-empty"
  >
    <template #content>
      <div class="d-flex flex-column align-center width-100">
        <img
          src="@/assets/img/empty-data.svg"
          alt="Empty data"
          class="mb-16"
        />
        <div class="opacity-70">No data available</div>
      </div>
    </template>
  </s-card>
</template>

<style scoped lang="scss">
  .s-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;

    img {
      max-width: 300px;
    }
  }
</style>
