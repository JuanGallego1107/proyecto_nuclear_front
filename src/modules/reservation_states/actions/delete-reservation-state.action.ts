import { backendApi } from '@/api/backendApi'

// Function to delete reservation state by its id
export const deleteReservationStateById = async (stateId: number) => {
  try {
    await backendApi.delete(`/reservation-states/${stateId}`)
  } catch (error) {
    throw new Error(`Error getting parking by id`)
  }
}
