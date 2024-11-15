import { backendApi } from '@/api/backendApi'

// Action to delete parking lot by its id
export const deleteParkingLotById = async (parkingLotId: number) => {
  try {
    await backendApi.delete(`/parking-lots/${parkingLotId}`)
  } catch (error) {
    throw new Error(`Error deleting parking by id`)
  }
}
