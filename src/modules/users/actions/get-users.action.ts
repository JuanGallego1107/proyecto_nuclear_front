import { backendApi } from '@/api/backendApi'
import type { User } from '@/modules/auth/interfaces/user.interface'

// Function to get User list
export const getUsersAction = async (page: number = 1) => {
  try {
    const { data } = await backendApi.get<User[]>(`/users`)

    return data
  } catch (error) {
    console.log(error)

    throw new Error('Error while fetching users')
  }
}
