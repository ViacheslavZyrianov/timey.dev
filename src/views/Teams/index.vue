<script setup lang="ts">
  import useTeamsStore from "@/store/teams";
  import {
    TypeTableHeader,
    TypeTableRow,
  } from "@/components/shared/s-table/types";
  import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
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

  const teams: Ref<TypeTeamRead[]> = ref([]);
  const deletingRowId: Ref<string | null> = ref(null);

  const tableRows: ComputedRef<TypeTableRow[]> = computed(() =>
    teams.value.map((team: TypeTeamRead) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      members: team.members?.length || 0,
    })),
  );

  const fetchTeams = async () => {
    teams.value = await teamsStore.fetchTeams();
  };

  const onRedirectToTeam = (id: string) => {
    router.push({
      name: "team",
      params: {
        team_id: id,
      },
    });
  };

  const onRemoveTeam = async (id: string) => {
    try {
      deletingRowId.value = id;
      await teamsStore.removeTeam(id);
      await fetchTeams();
    } catch (error) {
      console.error(error);
    } finally {
      deletingRowId.value = null;
    }
  };

  const checkIsDeletingRowById = (id: string) => deletingRowId.value === id;

  onMounted(async () => {
    await fetchTeams();
  });
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
      <div class="d-flex flex-align-center flex-column-gap-8">
        <s-button
          size="small"
          icon="mdiEyeOutline"
          color="info"
          @click="onRedirectToTeam(row.id)"
        >
          View Team
        </s-button>
        <s-button
          size="small"
          icon="mdiTrashCanOutline"
          color="error"
          :disabled="checkIsDeletingRowById(row.id)"
          :loading="checkIsDeletingRowById(row.id)"
          @click="onRemoveTeam(row.id)"
        >
          Remove Team
        </s-button>
      </div>
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
