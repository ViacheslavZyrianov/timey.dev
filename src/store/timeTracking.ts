import { defineStore } from "pinia";
import useAuthStore from '@/store/auth'
import {fetchTimeTrackingByMonth, postItem} from "@/utils/firebaseRequestor";
import {TypeTimeTrackingItemAdd, TypeTimeTrackingItemRead} from "@/types/time-tracking";

const authStore = useAuthStore();

export default defineStore('timeTracking', () => {
  async function fetchTimeTracking(month: number, year: number):Promise<TypeTimeTrackingItemRead[]> {
    return await fetchTimeTrackingByMonth<TypeTimeTrackingItemRead>(month, year)
  }

  async function postTimeTracking(payload: TypeTimeTrackingItemAdd):Promise<string> {
    return await postItem<TypeTimeTrackingItemAdd>(`users/${authStore.user.uid}/time-tracking`, payload)
  }

  return { fetchTimeTracking, postTimeTracking }
})
