import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { TeamType } from '@/types/teams'
import { fetchCollection, fetchDocById } from '@/utils/firebaseRequestor'

export default defineStore('teams', () => {
  const teams = reactive([])

  async function fetchTeams(): Promise<TeamType[]> {
    return await fetchCollection<TeamType>('teams')
  }

  async function postTeam(data: TypeTeamCreate): Promise<string> {
    return await postDoc<TypeTeamCreate>('teams', data)
  }

  return { teams, fetchTeams, fetchTeam, postTeam }
})
