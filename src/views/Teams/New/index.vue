<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useTeamsStore from '@/store/teams'
import { TypeTeamCreate } from '@/types/teams'

const router = useRouter()
const teamsStore = useTeamsStore()

const form: TypeTeamCreate = reactive({
  name: '',
  description: '',
})

const onAddNewTeam = async () => {
  const id = await teamsStore.postTeam(form)
  router.push({ name: 'team', params: { id } })
}
</script>

<template>
<s-card class="d-flex direction-column mb-auto flex-gap-12" width="400px">
  <template #title>
    Add Team
  </template>
  <template #content>
    <s-input v-model="form.name" label="Name" placeholder="Enter name" />
    <s-input v-model="form.description" label="Description" placeholder="Enter description" />
    <s-button title="Create new team" @click="onAddNewTeam" />
  </template>
</s-card>
</template>

<style scoped lang="scss">

</style>
