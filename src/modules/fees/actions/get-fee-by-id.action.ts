import { backendApi } from '@/api/backendApi'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { Fee } from '../interfaces/Fee.interface'

// Action to get fee by id
export const getFeeById = async (feeId: string) => {
  /// Get authenticated user info
  const authUser = useAuthStore()

  if (feeId === 'create') {
    return {
      id: null,
      name: '',
      cost: null,
      id_vehicle_type: null,
      /// User associated parking lot Id
      id_parking_lot: authUser.user?.id_parking_lot ?? 1,
    }
  }

  try {
    const { data } = await backendApi.get<Fee>(`/fees/${Number(feeId)}`)

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting fee by id`)
  }
}
