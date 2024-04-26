<script setup lang="ts">
import { useRoute } from "vue-router"
import useTeamsStore from "@/store/teams"
import tableHeaders from "./tableHeaders";
import { computed, ComputedRef, ref, Ref } from "vue";

const route = useRoute()
const teamsStore = useTeamsStore()

const uid: Ref<string> = ref('')

const teamId: ComputedRef<string> = computed(() => route.params.id.toString())

const onSubmitAddTeamMember = async () => {
  await teamsStore.postTeamMember(teamId.value, uid.value)
}

const team = await teamsStore.fetchTeam(teamId.value)

const teamMembersRequests = team.members ? team.members.map((member) => teamsStore.fetchTeamMemberById(member)) : null
const teamMembers = teamMembersRequests ? await Promise.all(teamMembersRequests) : []
</script>

<template>
  <div class="d-flex direction-column">
    <h1>{{ team.name }}</h1>
    <p>{{ team.description }}</p>
    <form @submit.prevent="onSubmitAddTeamMember">
      <s-input
        v-model="uid"
      />
      <s-button
        type="submit"
        icon="mdiAccountPlusOutline"
        title="Add team member"
      />
    </form>
    <s-table
      :headers="tableHeaders"
      :rows="teamMembers"
    />
  </div>
</template>
