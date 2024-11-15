import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const createUpdateParkingAction = async (
  parking: Partial<ParkingLot>,
) => {
  const parkingId = parking.id

  // Clean parking object before create/update operation
  parking = cleanProductForCreateUpdate(parking)

  if (parkingId && parkingId !== null) {
    // Update existing parking lot if id is present
    return await updateProduct(parkingId, parking)
  }

  // Create new parking lot if id is not present
  return await createProduct(parking)
}

// Clean the parking object by removing the id (needed for create/update logic)
const cleanProductForCreateUpdate = (parking: Partial<ParkingLot>) => {
  delete parking.id

  return parking
}

// Update parking lot by sending a PUT request to the backend
const updateProduct = async (
  parkingId: number,
  parking: Partial<ParkingLot>,
) => {
  try {
    // Send a PUT request to update parking lot data
    const { data } = await backendApi.put<ParkingLot>(
      `/parking-lots/${parkingId}`,
      parking,
    )
    return data
  } catch (error) {
    // Log error if the update fails
    console.log(error)
    throw new Error('Error updating product')
  }
}

// Create a new parking lot by sending a POST request to the backend
const createProduct = async (parking: Partial<ParkingLot>) => {
  try {
    // Send a POST request to create new parking lot data
    const { data } = await backendApi.post<ParkingLot>(`/parking-lots`, parking)
    return data
  } catch (error) {
    // Log error if the creation fails
    console.log(error)
    throw new Error('Error creating product')
  }
}
