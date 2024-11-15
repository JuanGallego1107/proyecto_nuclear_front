import { backendApi } from '@/api/backendApi'
import type { AdditionalService } from '../interfaces/AdditionalService'

// Retrieves additional services by parking ID
export const getAdditionalServiceByParkingId = async (
  page: number = 1, // Default page number is 1 if not provided
  serviceId: number,
) => {
  try {
    // Fetch additional services based on the parking lot ID
    const { data } = await backendApi.get<AdditionalService[]>(
      `/additional-services-by-parking/${serviceId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    // Error handling for retrieval failure
    throw new Error(`Error getting additional services`)
  }
}
