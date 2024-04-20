import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import pick from '@/utils/pick'
import useAuthStore from '@/store/auth'
import { UserType } from '@/types/user'

export default (cb: (a: boolean) => void) => {
  const auth = getAuth()
  const authStore = useAuthStore()
  onAuthStateChanged(auth, user => {
    if (user) {
      authStore.setUser(pick<User, UserType>(user, ['uid', 'displayName', 'email', 'photoURL']))
    }
    cb(!!user)
  })
}
