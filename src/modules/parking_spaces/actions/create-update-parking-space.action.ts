import { backendApi } from '@/api/backendApi'
import type { ParkingSpace } from '../interfaces/parking-space.interface'

export const createUpdateParkingSpaceAction = async (
  parkingSpace: Partial<ParkingSpace>,
) => {
  const spaceId = parkingSpace.id

  // Clean parking space object before create/update operation
  parkingSpace = cleanParkingSpaceForCreateUpdate(parkingSpace)

  console.log(parkingSpace)

  if (spaceId && spaceId !== null) {
    // Update existing parking space if id is present
    return await updateParkingSpace(spaceId, parkingSpace)
  }

  // Create new parking space if id is not present
  return await createParkingSpace(parkingSpace)
}

// Clean the parking space object by removing the id (needed for create/update logic)
const cleanParkingSpaceForCreateUpdate = (
  parkingSpace: Partial<ParkingSpace>,
) => {
  delete parkingSpace.id

  return parkingSpace
}

// Update parking space by sending a PUT request to the backend
const updateParkingSpace = async (
  spaceId: number,
  parkingSpace: Partial<ParkingSpace>,
) => {
  try {
    // Send a PUT request to update parking space data
    const { data } = await backendApi.put<ParkingSpace>(
      `/parking-spaces/${spaceId}`,
      parkingSpace,
    )
    return data
  } catch (error) {
    // Log error if the update fails
    console.log(error)
    throw new Error('Error updating parking space')
  }
}

// Create a new parking space by sending a POST request to the backend
const createParkingSpace = async (parkingSpace: Partial<ParkingSpace>) => {
  try {
    // Send a POST request to create new parking space data
    const { data } = await backendApi.post<ParkingSpace>(
      `/parking-spaces`,
      parkingSpace,
    )
    return data
  } catch (error) {
    // Log error if the creation fails
    console.log(error)
    throw new Error('Error creating parking space')
  }
}
