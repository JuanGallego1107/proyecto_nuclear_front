import { backendApi } from '@/api/backendApi'
import type { ReservationState } from '../interfaces/reservation-states.interface'

export const getReservationStateById = async (stateId: string) => {
  if (stateId === 'create') {
    return {
      id: null,
      name: '',
    }
  }

  try {
    const { data } = await backendApi.get<ReservationState>(
      `/reservation-states/${stateId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting reservation state by id`)
  }
}
