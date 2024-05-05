import { defineStore } from "pinia";
import useAuthStore from '@/store/auth'
import { fetchSubCollectionItems } from "@/utils/firebaseRequestor";
import { TypeTimeTrackingItemRead } from "@/types/time-tracking";

const authStore = useAuthStore();

export default defineStore('timeTracking', () => {
  async function fetchTimeTracking():Promise<TypeTimeTrackingItemRead[]> {
    return await fetchSubCollectionItems<TypeTimeTrackingItemRead>('users', authStore.user.uid, 'time-tracking')
  }

  return { fetchTimeTracking }
})
