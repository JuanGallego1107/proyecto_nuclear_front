import { backendApi } from '@/api/backendApi'

// Get ParkingSpace by its id
export const updateReservationState = async (
  reservationStateId: number,
  reservationId?: string,
) => {
  try {
    await backendApi.put(`/reservations/update-state/${reservationStateId}`, {
      id:
        Number(reservationId) == 0 || Number(reservationId) == null
          ? null
          : Number(reservationId),
      id_reservation_state: reservationStateId,
    })
  } catch (error) {
    throw new Error(`Error updatinf reservation state`)
  }
}
