import { defineStore } from 'pinia'
import type { User } from '../interfaces/user.interface'
import { computed, ref } from 'vue'
import { AuthStatus } from '../interfaces/auth-status.enum'
import { loginAction } from '../actions/login.action'
import { useLocalStorage } from '@vueuse/core'
import { registerParkingAction } from '../actions/register-parking.action'
import { checkAuthAction } from '../actions/check-auth.action'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const userSession = ref(useLocalStorage('session', ''))

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password)

      if (!loginResponse.ok) {
        logout()
        return false
      }

      console.log(`ID ROLE: ${loginResponse.user.id_role}`)
      console.log(`ID USER: ${loginResponse.user.id}`)

      user.value = loginResponse.user
      userSession.value = loginResponse.user.email
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      return logout()
    }
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction()

      if (!statusResp.ok) {
        logout()
        return false
      }

      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  const registerParking = async (
    name: string,
    address: string,
    phone_number: string,
    nit: string,
    coord_x: string,
    coord_y: string,
  ) => {
    try {
      const registerParkingResponse = await registerParkingAction(
        name,
        address,
        phone_number,
        nit,
        coord_x,
        coord_y,
      )

      if (!registerParkingResponse.ok) {
        logout()
        return registerParkingResponse.message
      }

      return {
        ok: true,
      }
    } catch (error) {}
  }

  const logout = () => {
    localStorage.removeItem('email')
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    userSession.value = null
    return false
  }

  return {
    user,
    authStatus,
    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(
      () => authStatus.value === AuthStatus.Authenticated,
    ),
    isAdmin: computed(() => user.value?.id_role == 1),
    username: computed(() => user.value?.name),
    login,
    logout,
    registerParking,
    checkAuthStatus,
  }
})
