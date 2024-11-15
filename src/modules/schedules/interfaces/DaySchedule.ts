export interface DaySchedule {
  id_week_day: number
  id_schedule: number
  id_parking_lot: number
  week_day: WeekDay
  schedule: Schedule
}

export interface Schedule {
  id: number
  start_time: string
  end_time: string
}

export interface WeekDay {
  id: number
  day_number: number
  name: string
}
