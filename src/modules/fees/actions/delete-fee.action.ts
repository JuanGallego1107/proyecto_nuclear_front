import { backendApi } from '@/api/backendApi'

export const deleteFeeById = async (feeId: number) => {
  try {
    await backendApi.delete(`/fees/${feeId}`)
  } catch (error) {
    throw new Error(`Error deleting fee by id`)
  }
}
