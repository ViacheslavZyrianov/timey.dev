<script setup lang="ts">
import { useRoute } from "vue-router";
import useTeamsStore from "@/store/teams";

const route = useRoute();
const teamsStore = useTeamsStore();

const team = await teamsStore.fetchTeam(`${route.params.id}`);
</script>

<template>
  <div class="d-flex direction-column">
    <h1>{{ team.name }}</h1>
    <p>{{ team.description }}</p>
  </div>
</template>
