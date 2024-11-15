import { backendApi } from '@/api/backendApi'

// Deletes an additional service by its ID
export const deleteAdditionalServiceById = async (serviceId: number) => {
  try {
    await backendApi.delete(`/additional-services/${serviceId}`)
  } catch (error) {
    // Error handling for deletion failure
    throw new Error(`Error deleting service by id`)
  }
}
