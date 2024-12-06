import { backendApi } from '@/api/backendApi'
import type { Reservation } from '../interfaces/reservation.interface'

// Get ParkingSpace by its id
export const getReservationsByNumber = async (number: string) => {
  try {
    const { data } = await backendApi.get<Reservation[]>(
      `/reservation-by-number/${Number(number)}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting reservation by id`)
  }
}
