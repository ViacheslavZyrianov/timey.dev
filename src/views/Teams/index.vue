<script setup lang="ts">
  import useTeamsStore from "@/store/teams";
  import {
    TypeTableHeader,
    TypeTableRow,
  } from "@/components/shared/s-table/types";
  import { computed, ComputedRef } from "vue";
  import { TypeTeamRead } from "@/types/teams";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const teamsStore = useTeamsStore();

  const tableHeaders: TypeTableHeader[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "members",
      label: "Members",
      width: "0",
    },
    {
      key: "actions",
      label: "",
      width: "0",
    },
  ];

  const tableRows: ComputedRef<TypeTableRow[]> = computed(() =>
    teams.map((team: TypeTeamRead) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      members: team.members?.length || 0,
    })),
  );

  const teams = await teamsStore.fetchTeams();

  const onRedirectToTeam = (id: string) => {
    router.push({
      name: "team",
      params: {
        team_id: id,
      },
    });
  };
</script>

<template>
  <div class="d-flex mb-8">
    <s-button
      icon="mdiAccountMultiplePlusOutline"
      color="success"
      class="ml-auto"
      :to="{
        name: 'team-new',
      }"
    >
      Add Team
    </s-button>
  </div>
  <s-table
    :headers="tableHeaders"
    :rows="tableRows"
  >
    <template #actions="{ row }">
      <s-button
        size="small"
        icon="mdiEyeOutline"
        color="info"
        @click="onRedirectToTeam(row.id)"
      >
        View Team
      </s-button>
    </template>
  </s-table>
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
