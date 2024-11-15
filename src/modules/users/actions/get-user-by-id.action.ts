import { backendApi } from '@/api/backendApi'
import type { User } from '@/modules/auth/interfaces/user.interface'

// Function to get user by id
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
