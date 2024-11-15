import { backendApi } from '@/api/backendApi'
import type { ReservationState } from '../interfaces/reservation-states.interface'

export const getReservationStateAction = async (page: number = 1) => {
  try {
    const { data } =
      await backendApi.get<ReservationState[]>(`/reservation-states`)

    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    throw new Error('Error while fetching payment methods')
  }
}
