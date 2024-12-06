export interface Reservation {
  id: number
  payment_date?: Date
  start_date: Date
  end_date: Date
  customer_name: string
  customer_email: string
  customer_id: string
  id_reservation_state: number
  id_payment_method: number
  id_parking_space: number
  id_fee: number
}
