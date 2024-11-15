import { backendApi } from '@/api/backendApi'
import type { Fee } from '../interfaces/Fee.interface'

// Action to fetch the fees list by parking ID
export const getFeesByParkingId = async (
  page: number = 1, // Default to page 1 for pagination
  parkingId: number, // Parking ID to filter the fees
) => {
  try {
    // Send a GET request to the backend API to retrieve fees for the given parking ID
    const { data } = await backendApi.get<Fee[]>(
      `/fees-by-parking/${parkingId}`,
    )

    // Return the data fetched from the API
    return {
      ...data,
    }
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Error getting fees`)
  }
}
