import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const getParkingById = async (parkingId: string) => {
  // Check if the parking ID is 'create' to return default values
  if (parkingId === 'create') {
    return {
      id: null,
      name: '',
      address: '',
      nit: '',
      coord_x: '',
      coord_y: '',
    }
  }

  try {
    // Make an API request to fetch parking lot data by ID
    const { data } = await backendApi.get<ParkingLot>(
      `/parking-lots/${parkingId}`,
    )

    // Return the fetched data
    return {
      ...data,
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    throw new Error(`Error getting parking by id`)
  }
}
