import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { TypeTeamRead, TypeTeamCreate } from '@/types/teams'
import { fetchItems, fetchItemById, postItem} from '@/utils/firebaseRequestor'

export default defineStore('teams', () => {
  const teams = reactive([])

  async function fetchTeams():Promise<TypeTeamRead[]> {
    return await fetchItems<TypeTeamRead>('teams')
  }

  async function fetchTeam(id: string): Promise<TypeTeamRead> {
    return await fetchItemById<TypeTeamRead>('teams', id)
  }

  async function postTeam(data: TypeTeamCreate): Promise<string> {
    return await postItem<TypeTeamCreate>('teams', data)
  }

  async function fetchTeamMemberById(teamMemberId: string): Promise<TypeTeamMemberRead> {
    return await fetchItemById<TypeTeamMemberRead>('users', teamMemberId)
  }
})
