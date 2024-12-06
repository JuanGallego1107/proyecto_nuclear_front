import type { ParkingSpace } from '@/modules/parking_spaces/interfaces/parking-space.interface'
import type { DaySchedule } from '../../schedules/interfaces/DaySchedule'
import type { Fee } from '@/modules/fees/interfaces/Fee.interface'
import type { AdditionalService } from '@/modules/additional_services/interfaces/AdditionalService'
export interface ParkingLot {
  id: number
  name: string
  address: string
  phone_number: string
  nit: string
  coord_x: string
  coord_y: string
  day_schedule?: Array<DaySchedule>
  parking_space?: Array<ParkingSpace>
  fee?: Array<Fee>
  additional_service?: Array<AdditionalService>
}
