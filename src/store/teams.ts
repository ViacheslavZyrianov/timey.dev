import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { TypeTeamRead, TypeTeamCreate } from '@/types/teams'
import { fetchCollection, fetchDocById, postDoc } from '@/utils/firebaseRequestor'

export default defineStore('teams', () => {
  const teams = reactive([])

  async function fetchTeams(): Promise<TypeTeamRead[]> {
    return await fetchCollection<TypeTeamRead>('teams')
  }

  async function fetchTeam(id: string): Promise<TypeTeamRead> {
    return await fetchDocById<TypeTeamRead>('teams', id)
  }

  async function postTeam(data: TypeTeamCreate): Promise<string> {
    return await postDoc<TypeTeamCreate>('teams', data)
  }

  return { teams, fetchTeams, fetchTeam, postTeam }
})
