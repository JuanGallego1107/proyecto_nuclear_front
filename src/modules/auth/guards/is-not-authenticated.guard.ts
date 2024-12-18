import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces/auth-status.enum'

// Route Guard for non authorized users
const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  // console.log(to);
  await authStore.checkAuthStatus()

  authStore.authStatus === AuthStatus.Authenticated
    ? next({ name: 'home' })
    : next()
}

export default isNotAuthenticatedGuard
