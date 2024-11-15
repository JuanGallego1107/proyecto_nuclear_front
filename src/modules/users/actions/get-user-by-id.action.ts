import { backendApi } from '@/api/backendApi'
import type { User } from '@/modules/auth/interfaces/user.interface'

export const getUserById = async (userId: string) => {
  try {
    const { data } = await backendApi.get<User>(`/users/${userId}`)

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting user by id`)
  }
}
