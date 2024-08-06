<script setup lang="ts">
  import useTeamsStore from "@/store/teams";
  import {
    TypeTableHeader,
    TypeTableRow,
  } from "@/components/shared/types/table";
  import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
  import { TypeTeamRead } from "@/types/teams";
  import { useRouter } from "vue-router";
  import { useEventBus } from "@vueuse/core";
  import { Color } from "@/types/common";
  import { TypeDropdownItem } from "@/components/shared/types/dropdown";
  import DialogAddEditTeam from "@/views/Teams/Dialogs/dialog-add-edit-team.vue";

  const router = useRouter();

  const teamsStore = useTeamsStore();

  const eventBus = useEventBus<string>("toast");

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
  const isLoading: Ref<boolean> = ref(false);
  const isDialogAddEditTeamOpened: Ref<boolean> = ref(false);

  const tableRows: ComputedRef<TypeTableRow[]> = computed(() =>
    teams.value.map((team: TypeTeamRead) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      members: team.members?.length || 0,
    })),
  );

  const dropdownItems: ComputedRef<(id: string) => TypeDropdownItem[]> =
    computed(() => (id: string) => [
      {
        label: "View",
        onClick: () => {
          onRedirectToTeam(id);
        },
      },
      {
        label: "Delete",
        color: Color.Error,
        onClick: () => {
          onRemoveTeam(id);
        },
      },
    ]);

  const isDeleting: ComputedRef<(id: string) => boolean> = computed(
    () => (id: string) => deletingRowId.value === id,
  );

  const onAddTeam = () => {
    isDialogAddEditTeamOpened.value = true;
  };

  const fetchTeams = async () => {
    try {
      isLoading.value = true;
      teams.value = await teamsStore.fetchTeams();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
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
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      deletingRowId.value = null;
    }
  };

  onMounted(async () => {
    await fetchTeams();
  });
</script>

<template>
  <div class="d-flex mb-8">
    <s-button
      icon="mdiAccountMultiplePlusOutline"
      :color="Color.Success"
      class="ml-auto"
      @click="onAddTeam"
    >
      Add Team
    </s-button>
  </div>
  <s-table
    :headers="tableHeaders"
    :rows="tableRows"
    :loading="isLoading"
  >
    <template #actions="{ row }">
      <s-dropdown
        :items="dropdownItems(row.id)"
        :disabled="isDeleting(row.id)"
        :loading="isDeleting(row.id)"
      />
    </template>
  </s-table>
  <dialog-add-edit-team
    v-model="isDialogAddEditTeamOpened"
    @submit="fetchTeams"
  />
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
