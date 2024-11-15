import { backendApi } from '@/api/backendApi'
import type { AdditionalService } from '../interfaces/AdditionalService'

export const getAdditionalServiceByParkingId = async (
  page: number = 1,
  serviceId: number,
) => {
  try {
    const { data } = await backendApi.get<AdditionalService[]>(
      `/additional-services-by-parking/${serviceId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting additional services`)
  }
}
