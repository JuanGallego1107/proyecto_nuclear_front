import { backendApi } from '@/api/backendApi'

export const deleteAdditionalServiceById = async (serviceId: number) => {
  try {
    await backendApi.delete(`/additional-services/${serviceId}`)
  } catch (error) {
    throw new Error(`Error deleting service by id`)
  }
}
