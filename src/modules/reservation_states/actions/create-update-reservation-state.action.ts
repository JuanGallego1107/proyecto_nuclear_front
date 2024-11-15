import { backendApi } from '@/api/backendApi'
import type { ReservationState } from '../interfaces/reservation-states.interface'

// Function to handle creating or updating a reservation state based on whether the state has an ID
export const createUpdateReservationStateAction = async (
  state: Partial<ReservationState>,
) => {
  // Extract the stateId from the provided state object
  const stateId = state.id

  // Clean up the state object for create/update operation
  state = cleanReservationStateForCreateUpdate(state)

  console.log(stateId)

  // If a stateId exists and is not null, update the existing reservation state
  if (stateId && stateId !== null) {
    // Update reservation state
    return await updateReservationState(stateId, state)
  }

  // If no stateId exists, create a new reservation state
  return await createReservationState(state)
}

// Function to clean the state object before creating or updating
const cleanReservationStateForCreateUpdate = (
  state: Partial<ReservationState>,
) => {
  // Remove the id from the state object as it's not required for the update
  delete state.id

  // Return the cleaned state object
  return state
}

// Function to update an existing reservation state
const updateReservationState = async (
  stateId: number,
  state: Partial<ReservationState>,
) => {
  try {
    // Send a PUT request to update the reservation state on the backend
    const { data } = await backendApi.put<ReservationState>(
      `/reservation-states/${stateId}`,
      state,
    )
    // Return the updated reservation state data
    return data
  } catch (error) {
    // Log any error and throw a custom error message
    console.log(error)
    throw new Error('Error updating state')
  }
}

// Function to create a new reservation state
const createReservationState = async (payment: Partial<ReservationState>) => {
  try {
    // Send a POST request to create a new reservation state on the backend
    const { data } = await backendApi.post<ReservationState>(
      `/reservation-states`,
      payment,
    )
    // Return the created reservation state data
    return data
  } catch (error) {
    // Log any error and throw a custom error message
    console.log(error)
    throw new Error('Error creating state')
  }
}
