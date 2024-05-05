import { defineStore } from "pinia";
import useAuthStore from '@/store/auth'
import { fetchTimeTrackingByMonth } from "@/utils/firebaseRequestor";
import { TypeTimeTrackingItemRead } from "@/types/time-tracking";

const authStore = useAuthStore();

export default defineStore('timeTracking', () => {
  async function fetchTimeTracking(month: number, year: number):Promise<TypeTimeTrackingItemRead[]> {
    return await fetchTimeTrackingByMonth<TypeTimeTrackingItemRead>(month, year)
  }

  return { fetchTimeTracking }
})
