import { defineStore } from "pinia";
import useAuthStore from '@/store/auth'
import {deleteItem, fetchTimeTrackingByMonth, postItem, updateItem} from "@/utils/firebaseRequestor";
import {TypeTimeTrackingItemAdd, TypeTimeTrackingItemRead} from "@/types/time-tracking";
import {TypeTaskInDayData} from "@/views/TimeTracking/types";

const authStore = useAuthStore();

export default defineStore('timeTracking', () => {
  async function fetchTimeTracking(month: number, year: number):Promise<TypeTimeTrackingItemRead[]> {
    return await fetchTimeTrackingByMonth<TypeTimeTrackingItemRead>(month, year)
  }

  async function postTimeTracking(payload: TypeTimeTrackingItemAdd):Promise<string> {
    return await postItem<TypeTimeTrackingItemAdd>(`users/${authStore.user.uid}/time-tracking`, payload)
  }

  async function updateTimeTracking(id: string, payload: TypeTaskInDayData):Promise<void> {
    await updateItem.updateDoc(`users/${authStore.user.uid}/time-tracking`, id, payload)
  }

  async function deleteTimeTracking(id: string):Promise<void> {
    await deleteItem(`users/${authStore.user.uid}/time-tracking`, id)
  }

  return { fetchTimeTracking, postTimeTracking, updateTimeTracking, deleteTimeTracking }
})
