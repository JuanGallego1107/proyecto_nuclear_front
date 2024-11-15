import { backendApi } from '@/api/backendApi'
import type { ParkingSpace } from '../interfaces/parking-space.interface'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

// Get ParkingSpace by its id
export const getParkingSpaceById = async (spaceId: string) => {
  /// Get authenticated user info
  const authUser = useAuthStore()

  // If id is create , retuns a default ParkingSpace object
  if (spaceId === 'create') {
    return {
      id: null,
      space_number: '',
      /// User associated parking lot Id
      id_parking_lot: authUser.user?.id_parking_lot ?? 1,
    }
  }

  try {
    const { data } = await backendApi.get<ParkingSpace>(
      `/parking-spaces/${Number(spaceId)}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting space by id`)
  }
}
