import type { VehicleType } from '@/modules/vehicle_types/interfaces/VehicleType.interface'

export interface Fee {
  id: number
  name: string
  cost: number
  id_parking_lot: number
  id_vehicle_type: number
  vehicle_type: VehicleType
}
