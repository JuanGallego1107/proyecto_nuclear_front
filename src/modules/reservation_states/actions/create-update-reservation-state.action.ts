import { backendApi } from '@/api/backendApi'
import type { ReservationState } from '../interfaces/reservation-states.interface'

export const createUpdateReservationStateAction = async (
  state: Partial<ReservationState>,
) => {
  const stateId = state.id

  state = cleanReservationStateForCreateUpdate(state)

  console.log(stateId)

  if (stateId && stateId !== null) {
    // Actualizar parqueadero
    return await updateReservationState(stateId, state)
  }

  // Crear parqueadero
  return await createReservationState(state)
}

const cleanReservationStateForCreateUpdate = (
  state: Partial<ReservationState>,
) => {
  delete state.id

  return state
}

const updateReservationState = async (
  stateId: number,
  state: Partial<ReservationState>,
) => {
  try {
    const { data } = await backendApi.put<ReservationState>(
      `/reservation-states/${stateId}`,
      state,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating state')
  }
}

const createReservationState = async (payment: Partial<ReservationState>) => {
  try {
    const { data } = await backendApi.post<ReservationState>(
      `/reservation-states`,
      payment,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating state')
  }
}
