import { backendApi } from '@/api/backendApi'

// Action to delete parking space by id
export const deleteParkingSpaceById = async (spaceId: number) => {
  try {
    await backendApi.delete(`/parking-spaces/${spaceId}`)
  } catch (error) {
    throw new Error(`Error deleting space by id`)
  }
}
