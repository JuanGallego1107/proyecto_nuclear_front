import { backendApi } from '@/api/backendApi'
import type { User } from '../interfaces/user.interface'
import { isAxiosError } from 'axios'

// Interface for error response from login
interface LoginError {
  ok: false
  message: string
}

// Interface for successful login response
interface LoginSucess {
  ok: true
  user: User
}

// Function to handle login action
export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSucess> => {
  try {
    // Sends POST request to the login endpoint
    const { data } = await backendApi.post('/login', {
      email,
      password,
    })

    // Returns success response if the request succeeds
    return {
      ok: true,
      user: data['user'], // Accesses user data from the response
    }
  } catch (error) {
    // Checks if the error is an Axios error
    if (isAxiosError(error)) {
      // Handles unauthorized (401) errors specifically
      if (error.response?.status === 401) {
        return {
          ok: false,
          // Return the error message from the response
          message: error.response.data['message'],
        }
      }
    }
    // Throws a generic error if it can't handle the specific case
    throw new Error('No se logro completar esta acción')
  }
}
