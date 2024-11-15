import { backendApi } from '@/api/backendApi'
import type { DaySchedule } from '../interfaces/DaySchedule'

// Function to get day schedules list by parking id
export const getDayScheduleByParkingId = async (
  page: number = 1,
  parkingId: number,
) => {
  try {
    const { data } = await backendApi.get<DaySchedule[]>(
      `/day-schedules-by-parking/${parkingId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting day schedules`)
  }
}
