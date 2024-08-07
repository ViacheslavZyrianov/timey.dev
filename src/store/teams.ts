import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  TypeTeamRead,
  TypeTeamCreate,
  TypeTeamMemberRead,
} from "@/types/teams";
import {
  fetchItems,
  fetchItemById,
  postItem,
  updateItem,
  checkIsItemExists,
  deleteItem,
} from "@/utils/firebaseRequestor";

export default defineStore("teams", () => {
  const teams = reactive([]);

  async function fetchTeams(): Promise<TypeTeamRead[]> {
    return await fetchItems<TypeTeamRead>("teams");
  }

  async function fetchTeam(id: string): Promise<TypeTeamRead> {
    return await fetchItemById<TypeTeamRead>("teams", id);
  }

  async function postTeam(data: TypeTeamCreate): Promise<string> {
    return await postItem<TypeTeamCreate>("teams", data);
  }

  async function removeTeam(id: string): Promise<void> {
    await deleteItem("teams", id);
  }

  async function fetchTeamMemberById(
    teamMemberId: string,
  ): Promise<TypeTeamMemberRead> {
    return await fetchItemById<TypeTeamMemberRead>("users", teamMemberId);
  }

  async function postTeamMember(
    teamId: string,
    teamMemberId: string,
  ): Promise<void> {
    const isUserExists = await checkIsItemExists("users", teamMemberId);
    if (isUserExists)
      await updateItem.arrayUnion("teams", teamId, "members", [teamMemberId]);
    else throw new Error(`${teamMemberId} does not exist`);
  }

  async function removeTeamMember(
    teamId: string,
    teamMemberIdToRemove: string,
  ): Promise<void> {
    const team: TypeTeamRead = await fetchTeam(teamId);
    team.members = team.members.filter(
      (teamMemberId: string): boolean => teamMemberId !== teamMemberIdToRemove,
    );
    await updateItem.updateDoc("teams", teamId, team);
  }

  return {
    teams,
    fetchTeams,
    fetchTeam,
    postTeam,
    removeTeam,
    fetchTeamMemberById,
    postTeamMember,
    removeTeamMember,
  };
});
