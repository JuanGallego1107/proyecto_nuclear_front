import { backendApi } from '@/api/backendApi'
import type { ParkingSpace } from '../interfaces/parking-space.interface'

export const createUpdateParkingSpaceAction = async (
  parkingSpace: Partial<ParkingSpace>,
) => {
  const spaceId = parkingSpace.id

  parkingSpace = cleanParkingSpaceForCreateUpdate(parkingSpace)

  console.log(parkingSpace)

  if (spaceId && spaceId !== null) {
    // Actualizar parqueadero
    return await updateParkingSpace(spaceId, parkingSpace)
  }

  // Crear parqueadero
  return await createParkingSpace(parkingSpace)
}

const cleanParkingSpaceForCreateUpdate = (
  parkingSpace: Partial<ParkingSpace>,
) => {
  delete parkingSpace.id

  return parkingSpace
}

const updateParkingSpace = async (
  spaceId: number,
  parkingSpace: Partial<ParkingSpace>,
) => {
  try {
    const { data } = await backendApi.put<ParkingSpace>(
      `/parking-spaces/${spaceId}`,
      parkingSpace,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating parking space')
  }
}

const createParkingSpace = async (parkingSpace: Partial<ParkingSpace>) => {
  try {
    const { data } = await backendApi.post<ParkingSpace>(
      `/parking-spaces`,
      parkingSpace,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating parking space')
  }
}
