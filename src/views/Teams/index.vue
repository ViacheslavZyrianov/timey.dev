<script setup lang="ts">
import AddTeam from './add-team.vue'
import useTeamsStore from '@/store/teams'

const teamsStore = useTeamsStore()

const teams = await teamsStore.fetchTeams()
</script>

<template>
  <div class="teams full-width height-fit-content">
    <s-card
      v-for="team in teams"
      :key="team.id"
      class="team"
      hover
      :to="`/teams/${team.id}`"
    >
      <template #title>
        {{ team.name }}
      </template>
      <template #content>
        {{ team.description }}
      </template>
    </s-card>
    <add-team />
  </div>
</template>

<style lang="scss" scoped>
.teams {
  display: grid;
  gap: 16px 16px;
  grid-template-columns: repeat(3, 1fr);

  .team {
    min-width: 200px;
    height: 200px;
  }
}
</style>
