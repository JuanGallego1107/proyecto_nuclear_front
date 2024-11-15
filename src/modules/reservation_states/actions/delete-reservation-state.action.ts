import { backendApi } from '@/api/backendApi'

export const deleteReservationStateById = async (stateId: number) => {
  try {
    await backendApi.delete(`/reservation-states/${stateId}`)
  } catch (error) {
    throw new Error(`Error getting parking by id`)
  }
}
