import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import routes from './routes/index'
import checkIsUserLoggedIn from '@/middleware/checkIsUserLoggedIn'
import useAuthStore from '@/store/auth'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  checkIsUserLoggedIn((isUserLoggedIn: boolean) => {
    const authStore = useAuthStore()
    authStore.isUserLoggedIn = isUserLoggedIn
    if (!isUserLoggedIn && to.name !== 'auth') next('auth')
    else if (isUserLoggedIn && to.name === 'auth') next('dashboard')
    else next()
  })
})

export default router
