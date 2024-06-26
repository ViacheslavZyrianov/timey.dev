<script setup lang="ts">
import { computed, ComputedRef, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import useTeamsStore from "@/store/teams"
import tableHeaders from "./tableHeaders";
import { useTitle } from "@vueuse/core";

const route = useRoute()
const router = useRouter()
const teamsStore = useTeamsStore()

const uid: Ref<string> = ref('')

const teamId: ComputedRef<string> = computed(() => route.params.team_id.toString())

const onSubmitAddTeamMember = async () => {
  await teamsStore.postTeamMember(teamId.value, uid.value)
}

const team = await teamsStore.fetchTeam(teamId.value)

useTitle(team.name)

const teamMembersRequests = team.members ? team.members.map((member) => teamsStore.fetchTeamMemberById(member)) : null
const teamMembers = teamMembersRequests ? await Promise.all(teamMembersRequests) : []

const onRedirectToTeamMemberDetails = (member_id: string) => {
  router.push({
    name: 'team-member',
    params: {
      team_id: team.id,
      member_id
    }
  })
}
</script>

<template>
  <div class="d-flex direction-column full-width">
    <h1>{{ team.name }}</h1>
    <p>{{ team.description }}</p>
    <form class="d-flex ml-auto mb-8" @submit.prevent="onSubmitAddTeamMember">
      <s-input
        v-model="uid"
        placeholder="Enter user id"
        width="300px"
      />
      <s-button
        type="submit"
        icon="mdiAccountPlusOutline"
        title="Add team member"
        class="ml-8"
      />
    </form>
    <s-table
      :headers="tableHeaders"
      :rows="teamMembers"
    >
      <template #actions="{ row }">
        <s-button
          size="small"
          title="View Member"
          icon="mdiEyeOutline"
          @click="onRedirectToTeamMemberDetails(row.id)"
        />
      </template>
    </s-table>
  </div>
</template>
