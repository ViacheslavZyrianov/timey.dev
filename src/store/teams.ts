import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { TeamType } from '@/types/teams'
import { fetchCollection, fetchDocById } from '@/utils/firebaseRequestor'

export default defineStore('teams', () => {
  const teams = reactive([])

  async function fetchTeams(): Promise<TeamType[]> {
    return await fetchCollection<TeamType>('teams')
  }

  async function fetchTeam(id: string): Promise<TeamType> {
    return await fetchDocById<TeamType>('teams', id)
  }

  return { teams, fetchTeams, fetchTeam }
})
