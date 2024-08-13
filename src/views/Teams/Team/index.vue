<script setup lang="ts">
  import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import useTeamsStore from "@/store/teams";
  import tableHeaders from "./tableHeaders";
  import { useEventBus, useTitle } from "@vueuse/core";
  import { TypeTeamMemberRead, TypeTeamRead } from "@/types/teams";
  import { Color } from "@/types/common";
  import { ButtonType } from "@/components/shared/types/button";
  import { TypeDropdownItem } from "@/components/shared/types/dropdown";

  const router = useRouter();
  const route = useRoute();
  const teamsStore = useTeamsStore();

  const team: Ref<TypeTeamRead | null> = ref(null);
  const teamMembers: Ref<TypeTeamMemberRead[]> = ref([]);
  const uid: Ref<string> = ref("");
  const deletingRowId: Ref<string | null> = ref(null);
  const isButtonAddTeamMemberDisabled: Ref<boolean> = ref(false);
  const isButtonAddTeamMemberLoading: Ref<boolean> = ref(false);
  const isLoadingTeamMembers: Ref<boolean> = ref(false);

  useTitle(team.value?.name);

  const eventBus = useEventBus<string>("toast");

  const teamId: ComputedRef<string> = computed(() =>
    route.params.team_id.toString(),
  );

  const dropdownItems: ComputedRef<(id: string) => TypeDropdownItem[]> =
    computed(() => (id: string) => [
      {
        label: "View",
        onClick: () => {
          onRedirectToTeamMember(id);
        },
      },
      {
        label: "Delete",
        color: Color.Error,
        onClick: () => {
          onRemoveMemberFromTeam(id);
        },
      },
    ]);

  const isDeleting: ComputedRef<(id: string) => boolean> = computed(
    () => (id: string) => deletingRowId.value === id,
  );

  const onRedirectToTeamMember = (member_id: string) => {
    router.push({
      name: "team-member",
      params: {
        team_id: team.value?.id,
        member_id,
      },
    });
  };

  const onRemoveMemberFromTeam = async (id: string) => {
    try {
      deletingRowId.value = id;
      await teamsStore.removeTeamMember(teamId.value, id);
      await fetchTeam();
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      deletingRowId.value = null;
    }
  };

  const onSubmitAddTeamMember = async () => {
    try {
      isButtonAddTeamMemberDisabled.value = true;
      isButtonAddTeamMemberLoading.value = true;
      await teamsStore.postTeamMember(teamId.value, uid.value);
      await fetchTeam();
      uid.value = "";
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      isButtonAddTeamMemberDisabled.value = false;
      isButtonAddTeamMemberLoading.value = false;
    }
  };

  const fetchTeamMembers = async () => {
    try {
      isLoadingTeamMembers.value = true;
      const teamMembersRequests = team.value?.members
        ? team.value.members.map((member) =>
            teamsStore.fetchTeamMemberById(member),
          )
        : null;
      teamMembers.value = teamMembersRequests
        ? await Promise.all(teamMembersRequests)
        : [];
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      isLoadingTeamMembers.value = false;
    }
  };

  const fetchTeam = async () => {
    try {
      team.value = await teamsStore.fetchTeam(teamId.value);
      await fetchTeamMembers();
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    }
  };

  onMounted(async () => {
    await fetchTeam();
  });
</script>

<template>
  <div
    v-if="team"
    class="d-flex direction-column full-width"
  >
    <h1>{{ team.name }}</h1>
    <h3 v-if="team?.description">
      {{ team.description }}
    </h3>
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
        :type="ButtonType.Submit"
        icon="mdiAccountPlusOutline"
        :color="Color.Success"
        class="ml-8"
        :disabled="isButtonAddTeamMemberDisabled"
        :loading="isButtonAddTeamMemberLoading"
      >
        Add team member
      </s-button>
    </form>
    <s-table
      :headers="tableHeaders"
      :rows="teamMembers"
      :loading="isLoadingTeamMembers"
    >
      <template #photoURL="{ row }">
        <s-avatar
          :src="row.photoURL"
          :size="48"
          class="avatar"
        />
      </template>

      <template #actions="{ row }">
        <s-dropdown
          :items="dropdownItems(row.id)"
          :disabled="isDeleting(row.id)"
          :loading="isDeleting(row.id)"
        />
      </template>
    </s-table>
  </div>
</template>
