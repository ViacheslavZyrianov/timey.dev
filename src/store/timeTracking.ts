import { defineStore } from "pinia";
import useAuthStore from "@/store/auth";
import {
  deleteItem,
  fetchTimeTrackingForUserByDate,
  postItem,
  updateItem,
} from "@/utils/firebaseRequestor";
import {
  TypeTimeTrackingItemAdd,
  TypeTimeTrackingItemRead,
} from "@/types/time-tracking";
import { TypeTaskInDayData } from "@/views/TimeTracking/types";
import { reactive } from "vue";

export default defineStore("timeTracking", () => {
  const authStore = useAuthStore();

  type State = {
    timeTrackingData: TypeTimeTrackingItemRead[];
  };

  const state: State = reactive({
    timeTrackingData: [],
  });

  async function fetchTimeTracking(
    month: number,
    year: number,
    userId: string,
  ): Promise<void> {
    state.timeTrackingData =
      await fetchTimeTrackingForUserByDate<TypeTimeTrackingItemRead>({
        month,
        year,
        userId,
      });
  }

  async function postTimeTracking(
    payload: TypeTimeTrackingItemAdd,
  ): Promise<string> {
    return await postItem<TypeTimeTrackingItemAdd>(
      `users/${authStore.user.uid}/time-tracking`,
      payload,
    );
  }

  async function updateTimeTracking(
    id: string,
    payload: Omit<TypeTaskInDayData, "id">,
  ): Promise<void> {
    await updateItem.updateDoc(
      `users/${authStore.user.uid}/time-tracking`,
      id,
      payload,
    );
  }

  async function deleteTimeTracking(id: string): Promise<void> {
    await deleteItem(`users/${authStore.user.uid}/time-tracking`, id);
  }

  return {
    state,
    fetchTimeTracking,
    postTimeTracking,
    updateTimeTracking,
    deleteTimeTracking,
  };
});
