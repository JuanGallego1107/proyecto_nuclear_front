import { backendApi } from '@/api/backendApi'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

export const createUpdateParkingAction = async (
  parking: Partial<ParkingLot>,
) => {
  const parkingId = parking.id

  parking = cleanProductForCreateUpdate(parking)

  if (parkingId && parkingId !== null) {
    // Actualizar parqueadero
    return await updateProduct(parkingId, parking)
  }

  // Crear parqueadero
  return await createProduct(parking)
}

const cleanProductForCreateUpdate = (parking: Partial<ParkingLot>) => {
  delete parking.id

  return parking
}

const updateProduct = async (
  parkingId: number,
  parking: Partial<ParkingLot>,
) => {
  try {
    const { data } = await backendApi.put<ParkingLot>(
      `/parking-lots/${parkingId}`,
      parking,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating product')
  }
}

const createProduct = async (parking: Partial<ParkingLot>) => {
  try {
    const { data } = await backendApi.post<ParkingLot>(`/parking-lots`, parking)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating product')
  }
}
