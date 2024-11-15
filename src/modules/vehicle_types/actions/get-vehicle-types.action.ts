import { backendApi } from '@/api/backendApi'
import type { VehicleType } from '../interfaces/VehicleType.interface'

/// Action to get VehicleType list
export const getVehicleTypesAction = async () => {
  try {
    const { data } = await backendApi.get<VehicleType[]>(`/vehicle-types`)

    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    throw new Error('Error while fetching vehicle types: ' + error)
  }
}
