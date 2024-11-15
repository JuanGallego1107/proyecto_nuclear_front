import { isAxiosError } from 'axios'

interface CheckError {
  ok: false
}

interface CheckSuccess {
  ok: true
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
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
