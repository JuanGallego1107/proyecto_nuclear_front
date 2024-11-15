import { backendApi } from '@/api/backendApi'

export const deleteParkingSpaceById = async (spaceId: number) => {
  try {
    await backendApi.delete(`/parking-spaces/${spaceId}`)
  } catch (error) {
    throw new Error(`Error deleting space by id`)
  }
}
