import { backendApi } from '@/api/backendApi'
import type { ReservationState } from '../interfaces/reservation-states.interface'

// Function to fetch a reservation state by its ID
export const getReservationStateById = async (stateId: string) => {
  // If the stateId is 'create', return a default object for creating a new reservation state
  if (stateId === 'create') {
    return {
      id: null,
      name: '',
    }
  }

  try {
    // Fetch the reservation state data from the backend using the given stateId
    const { data } = await backendApi.get<ReservationState>(
      `/reservation-states/${stateId}`,
    )

    // Return the fetched reservation state data
    return {
      ...data,
    }
  } catch (error) {
    // If the API call fails, throw an error with a custom message
    throw new Error(`Error getting reservation state by id`)
  }
}
