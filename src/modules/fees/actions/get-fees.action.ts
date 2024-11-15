import { backendApi } from '@/api/backendApi'
import type { Fee } from '../interfaces/Fee.interface'

// Action to get fees list by parking id
export const getFeesByParkingId = async (
  page: number = 1,
  parkingId: number,
) => {
  try {
    const { data } = await backendApi.get<Fee[]>(
      `/fees-by-parking/${parkingId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting fees`)
  }
}
