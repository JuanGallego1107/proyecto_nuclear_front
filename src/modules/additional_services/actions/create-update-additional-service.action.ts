import { backendApi } from '@/api/backendApi'
import type { AdditionalService } from '../interfaces/AdditionalService'

// Main action to create or update an additional service based on the presence of a service ID
export const createUpdateAdditionalServiceAction = async (
  additionalService: Partial<AdditionalService>,
) => {
  const serviceId = additionalService.id

  // Clean up the additional service object by removing unnecessary fields for API request
  additionalService = cleanAdditionalServiceForCreateUpdate(additionalService)

  console.log(additionalService)

  // If a service ID exists, update the existing additional service
  if (serviceId && serviceId !== null) {
    return await updateAdditionalService(serviceId, additionalService)
  }

  // Otherwise, create a new additional service
  return await createAdditionalService(additionalService)
}

// Function to remove the service ID from the additional service object before creating or updating
const cleanAdditionalServiceForCreateUpdate = (
  additionalService: Partial<AdditionalService>,
) => {
  delete additionalService.id
  return additionalService
}

// Update an existing additional service by making a PUT request
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
    throw new Error('Error updating additional service') // Error handling for update failure
  }
}

// Create a new additional service by making a POST request
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
    throw new Error('Error creating additional service') // Error handling for creation failure
  }
}
