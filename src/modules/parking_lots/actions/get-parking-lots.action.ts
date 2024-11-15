import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const getParkingLotsAction = async (
  page: number = 1,
  limit: number = 10,
) => {
  try {
    // Make an API request to fetch a list of parking lots with pagination
    const { data } = await backendApi.get<ParkingLot[]>(
      `/parking-lots?page=${page}`,
    )

    // Log the fetched data for debugging purposes
    console.log(data)

    // Return the fetched parking lot data
    return data
  } catch (error) {
    // Log any errors that occur during the API request
    console.log(error)

    // Throw an error if the request fails
    throw new Error('Error while fetching parking lots')
  }
}
