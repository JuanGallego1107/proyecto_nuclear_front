import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const getParkingById = async (parkingId: string) => {
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
    const { data } = await backendApi.get<ParkingLot>(
      `/parking-lots/${parkingId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting parking by id`)
  }
}
