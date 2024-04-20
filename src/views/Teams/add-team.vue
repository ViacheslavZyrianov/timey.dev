<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onRedirectToTeamNew = () => {
  router.push({
    name: 'team-new'
  })
}
</script>


<template>
  <s-button
    title="Add team"
    icon="mdiAccountMultiplePlusOutline"
    :icon-size="64"
    type="outlined"
    size="large"
    color="support-1"
    height="200px"
    class="d-flex justify-center flex-column"
    @click="onRedirectToTeamNew"
  />
</template>
