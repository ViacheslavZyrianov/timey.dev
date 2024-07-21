<script setup lang="ts">
  import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
  import { RouteLocationRaw, useRoute } from "vue-router";
  import useTeamsStore from "@/store/teams";
  import tableHeaders from "./tableHeaders";
  import { useTitle } from "@vueuse/core";
  import { TypeTeamMemberRead, TypeTeamRead } from "@/types/teams";

  const route = useRoute();
  const teamsStore = useTeamsStore();

  const team: Ref<TypeTeamRead | null> = ref(null);
  const teamMembers: Ref<TypeTeamMemberRead[]> = ref([]);
  const uid: Ref<string> = ref("");
  const deletingButtonId: Ref<string | null> = ref(null);

  useTitle(team.value?.name);

  const teamId: ComputedRef<string> = computed(() =>
    route.params.team_id.toString(),
  );

  const generateTeamMemberDetailsLink = (
    member_id: string,
  ): RouteLocationRaw => ({
    name: "team-member",
    params: {
      team_id: team.value?.id,
      member_id,
    },
  });

  const onSubmitAddTeamMember = async () => {
    await teamsStore.postTeamMember(teamId.value, uid.value);
  };

  const onRemoveTeamMember = async (id: string) => {
    try {
      deletingButtonId.value = id;
      await teamsStore.removeTeamMember(teamId.value, id);
      await fetchTeam();
      await fetchTeamMembers();
    } catch (error) {
      console.error(error);
    } finally {
      deletingButtonId.value = null;
    }
  };

  const fetchTeam = async () => {
    team.value = await teamsStore.fetchTeam(teamId.value);
  };

  const fetchTeamMembers = async () => {
    const teamMembersRequests = team.value?.members
      ? team.value.members.map((member) =>
          teamsStore.fetchTeamMemberById(member),
        )
      : null;
    teamMembers.value = teamMembersRequests
      ? await Promise.all(teamMembersRequests)
      : [];
  };

  const isDeleting = (id: string) => deletingButtonId.value === id;

  onMounted(async () => {
    await fetchTeam();
    await fetchTeamMembers();
  });
</script>

<template>
  <div
    v-if="team"
    class="d-flex direction-column full-width"
  >
    <h1>{{ team.name }}</h1>
    <p v-if="team.description">{{ team.description }}</p>
    <form
      class="d-flex ml-auto mb-8"
      @submit.prevent="onSubmitAddTeamMember"
    >
      <s-input
        v-model="uid"
        placeholder="Enter user id"
        width="300px"
      />
      <s-button
        type="submit"
        icon="mdiAccountPlusOutline"
        color="success"
        class="ml-8"
      >
        Add team member
      </s-button>
    </form>
    <s-table
      :headers="tableHeaders"
      :rows="teamMembers"
    >
      <template #photoURL="{ row }">
        <s-avatar
          :src="row.photoURL"
          :size="48"
          class="avatar"
        />
      </template>
      <template #actions="{ row }">
        <div class="d-flex flex-column-gap-4">
          <s-button
            :to="generateTeamMemberDetailsLink(row.id)"
            size="small"
            icon="mdiEyeOutline"
            color="info"
          >
            View
          </s-button>
          <s-button
            size="small"
            icon="mdiTrashCanOutline"
            color="error"
            :disabled="isDeleting(row.id)"
            :loading="isDeleting(row.id)"
            @click="onRemoveTeamMember(row.id)"
          >
            Remove
          </s-button>
        </div>
      </template>
    </s-table>
  </div>
</template>
