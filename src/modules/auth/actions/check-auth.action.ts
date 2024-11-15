import { isAxiosError } from 'axios'

interface CheckError {
  ok: false
}

interface CheckSuccess {
  ok: true
}

// Validate authorization status of user
export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    // Get authorization token from local storage
    const localToken = localStorage.getItem('email')

    if (localToken && localToken.length < 10) {
      return { ok: false }
    }

    console.log(localToken)

    return {
      ok: false,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      }
    }

    throw new Error('No se pudo verificar la sesión')
  }
}
