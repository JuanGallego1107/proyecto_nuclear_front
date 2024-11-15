import { backendApi } from '@/api/backendApi'
import type { ParkingSpace } from '../interfaces/parking-space.interface'

export const getParkingSpacesByParkingId = async (
  page: number = 1,
  parkingId: number,
) => {
  try {
    // Make a GET request to fetch parking spaces based on parkingId
    const { data } = await backendApi.get<ParkingSpace[]>(
      `/parking-spaces-by-parking/${parkingId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Error getting parking spaces`)
  }
}
