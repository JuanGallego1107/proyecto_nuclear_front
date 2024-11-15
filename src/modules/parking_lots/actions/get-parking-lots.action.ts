import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const getParkingLotsAction = async (
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const { data } = await backendApi.get<ParkingLot[]>(
      `/parking-lots?page=${page}`,
    )

    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    throw new Error('Error while fetching parking lots')
  }
}
