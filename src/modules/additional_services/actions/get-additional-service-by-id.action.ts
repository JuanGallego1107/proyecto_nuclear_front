import { backendApi } from '@/api/backendApi'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { AdditionalService } from '../interfaces/AdditionalService'

export const getAdditionalServiceById = async (serviceId: string) => {
  /// Get authenticated user info
  const authUser = useAuthStore()

  if (serviceId === 'create') {
    return {
      id: null,
      name: '',
      cost: null,
      /// User associated with the parking lot Id
      id_parking_lot: authUser.user?.id_parking_lot ?? 1,
    }
  }

  try {
    const { data } = await backendApi.get<AdditionalService>(
      `/additional-services/${Number(serviceId)}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting service by id`)
  }
}
