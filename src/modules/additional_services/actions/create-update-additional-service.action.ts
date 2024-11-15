import { backendApi } from '@/api/backendApi'
import type { AdditionalService } from '../interfaces/AdditionalService'

export const createUpdateAdditionalServiceAction = async (
  additionalService: Partial<AdditionalService>,
) => {
  const serviceId = additionalService.id

  additionalService = cleanAdditionalServiceForCreateUpdate(additionalService)

  console.log(additionalService)

  if (serviceId && serviceId !== null) {
    // Actualizar parqueadero
    return await updateAdditionalService(serviceId, additionalService)
  }

  // Crear parqueadero
  return await createAdditionalService(additionalService)
}

const cleanAdditionalServiceForCreateUpdate = (
  additionalService: Partial<AdditionalService>,
) => {
  delete additionalService.id

  return additionalService
}

const updateAdditionalService = async (
  serviceId: number,
  additionalService: Partial<AdditionalService>,
) => {
  try {
    const { data } = await backendApi.put<AdditionalService>(
      `/additional-services/${serviceId}`,
      additionalService,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating additional service')
  }
}

const createAdditionalService = async (
  additionalService: Partial<AdditionalService>,
) => {
  try {
    const { data } = await backendApi.post<AdditionalService>(
      `/additional-services`,
      additionalService,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating additional service')
  }
}
