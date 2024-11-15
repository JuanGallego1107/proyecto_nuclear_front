import { backendApi } from '@/api/backendApi'
import type { User } from '@/modules/auth/interfaces/user.interface'

// Function to update user state
export const updateUserState = async (userId: number, user: Partial<User>) => {
  try {
    await backendApi.put(`/users/${userId}`, user)
  } catch (error) {
    console.log(error)
    throw new Error('Error updating state')
  }
}
