import { backendApi } from '@/api/backendApi'

// Action to delete fee by its id
export const deleteFeeById = async (feeId: number) => {
  try {
    await backendApi.delete(`/fees/${feeId}`)
  } catch (error) {
    throw new Error(`Error deleting fee by id`)
  }
}
