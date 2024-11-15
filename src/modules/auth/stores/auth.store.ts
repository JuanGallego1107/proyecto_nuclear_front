import { defineStore } from 'pinia'
import type { User } from '../interfaces/user.interface'
import { computed, ref } from 'vue'
import { AuthStatus } from '../interfaces/auth-status.enum'
import { loginAction } from '../actions/login.action'
import { useLocalStorage } from '@vueuse/core'
import { registerParkingAction } from '../actions/register-parking.action'
import { checkAuthAction } from '../actions/check-auth.action'

export const useAuthStore = defineStore('auth', () => {
  // State variables for authentication status, user info, and session
  const authStatus = ref(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const userSession = ref(useLocalStorage('session', ''))

  // Login function to authenticate user with email and password
  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password)

      // If login fails, call logout and return false
      if (!loginResponse.ok) {
        logout()
        return false
      }

      // Log user role and ID for debugging purposes
      console.log(`ID ROLE: ${loginResponse.user.id_role}`)
      console.log(`ID USER: ${loginResponse.user.id}`)

      // Set user data and update auth status
      user.value = loginResponse.user
      userSession.value = loginResponse.user.email
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      // If an error occurs, log out and return false
      return logout()
    }
  }

  // Function to check the user's authentication status
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction()

      // If the status response is not OK, call logout
      if (!statusResp.ok) {
        logout()
        return false
      }

      // Update authentication status to Authenticated
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      // In case of error, log out the user
      logout()
      return false
    }
  }

  // Function to register a new parking lot
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

      // If parking registration fails, call logout and return error message
      if (!registerParkingResponse.ok) {
        logout()
        return registerParkingResponse.message
      }

      return {
        ok: true,
      }
    } catch (error) {
      // Handle any registration errors here
    }
  }

  // Logout function to clear user session and reset auth status
  const logout = () => {
    localStorage.removeItem('email')
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    userSession.value = null
    return false
  }

  // Return store properties and methods for use in components
  return {
    user,
    authStatus,
    // Getters to check auth status and user role
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
