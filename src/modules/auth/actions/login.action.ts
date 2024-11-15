import { backendApi } from '@/api/backendApi'
import type { User } from '../interfaces/user.interface'
import { isAxiosError } from 'axios'

interface LoginError {
  ok: false
  message: string
}

interface LoginSucess {
  ok: true
  user: User
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSucess> => {
  try {
    const { data } = await backendApi.post('/login', {
      email,
      password,
    })

    return {
      ok: true,
      user: data['user'],
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: error.response.data['message'],
        }
      }
    }
    throw new Error('No se logro completar esta acción')
  }
}
