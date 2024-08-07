<script setup lang="ts">
  import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
  import { RouteLocationRaw, useRoute } from "vue-router";
  import useTeamsStore from "@/store/teams";
  import tableHeaders from "./tableHeaders";
  import { useEventBus, useTitle } from "@vueuse/core";
  import { TypeTeamMemberRead, TypeTeamRead } from "@/types/teams";
  import { Color, Size } from "@/types/common";
  import { ButtonType } from "@/components/shared/types/button";

  const route = useRoute();
  const teamsStore = useTeamsStore();

  const team: Ref<TypeTeamRead | null> = ref(null);
  const teamMembers: Ref<TypeTeamMemberRead[]> = ref([]);
  const uid: Ref<string> = ref("");
  const deletingButtonId: Ref<string | null> = ref(null);
  const isButtonAddTeamMemberDisabled: Ref<boolean> = ref(false);
  const isButtonAddTeamMemberLoading: Ref<boolean> = ref(false);
  const isLoadingTeamMembers: Ref<boolean> = ref(false);

  useTitle(team.value?.name);

  const eventBus = useEventBus<string>("toast");

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

  const onRemoveTeamMember = async (id: string) => {
    try {
      deletingButtonId.value = id;
      await teamsStore.removeTeamMember(teamId.value, id);
      await fetchTeam();
    } catch (error) {
      eventBus.emit("toast", {
        text: error,
        status: "error",
      });
    } finally {
      deletingButtonId.value = null;
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

  const isDeleting = (id: string) => deletingButtonId.value === id;

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
        <div class="d-flex flex-column-gap-4">
          <s-button
            :to="generateTeamMemberDetailsLink(row.id)"
            :size="Size.Small"
            icon="mdiEyeOutline"
            :color="Color.Success"
          >
            View
          </s-button>
          <s-button
            :size="Size.Small"
            icon="mdiTrashCanOutline"
            :color="Color.Error"
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
