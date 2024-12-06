import { backendApi } from '@/api/backendApi'
import type { Reservation } from '../interfaces/reservation.interface'

export const createUpdateReservationAction = async (
  reservation: Partial<Reservation>,
) => {
  const reservationId = reservation.id

  // Clean parking space object before create/update operation
  reservation = cleanReservationForCreateUpdate(reservation)

  console.log(reservation)

  if (reservationId && reservationId !== null) {
    // Update existing parking space if id is present
    return await updateReservation(reservationId, reservation)
  }

  // Create new parking space if id is not present
  return await createReservation(reservation)
}

// Clean the parking space object by removing the id (needed for create/update logic)
const cleanReservationForCreateUpdate = (reservation: Partial<Reservation>) => {
  delete reservation.id

  return reservation
}

// Update parking space by sending a PUT request to the backend
const updateReservation = async (
  reservationId: number,
  reservation: Partial<Reservation>,
) => {
  try {
    // Send a PUT request to update parking space data
    const { data } = await backendApi.put<Reservation>(
      `/reservations/${reservationId}`,
      reservation,
    )
    return data
  } catch (error) {
    // Log error if the update fails
    console.log(error)
    throw new Error('Error updating parking space')
  }
}

// Create a new parking space by sending a POST request to the backend
const createReservation = async (reservation: Partial<Reservation>) => {
  try {
    // Send a POST request to create new parking space data
    const { data } = await backendApi.post<Reservation>(`/reservations`, {
      ...reservation,
      payment_date: null,
      id_reservation_state: 1,
    })
    return data
  } catch (error) {
    // Log error if the creation fails
    console.log(error)
    throw new Error('Error creating parking space')
  }
}
