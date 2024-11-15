import { backendApi } from '@/api/backendApi'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { AdditionalService } from '../interfaces/AdditionalService'

// Retrieves an additional service by ID, or returns a default object for creating a new service
export const getAdditionalServiceById = async (serviceId: string) => {
  /// Get authenticated user info
  const authUser = useAuthStore()

  // If 'create' is passed as ID, return a default object for creating a new service
  if (serviceId === 'create') {
    return {
      id: null,
      name: '',
      cost: null,
      /// Sets the associated parking lot ID based on authenticated user info, defaulting to 1
      id_parking_lot: authUser.user?.id_parking_lot ?? 1,
    }
  }

  try {
    // Fetch an existing additional service by its ID
    const { data } = await backendApi.get<AdditionalService>(
      `/additional-services/${Number(serviceId)}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    // Error handling for retrieval failure
    throw new Error(`Error getting service by id`)
  }
}
