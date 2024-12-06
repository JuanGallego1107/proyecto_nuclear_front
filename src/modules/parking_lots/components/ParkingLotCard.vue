<template>
  <RouterLink :to="`/reservation-detail/${parkingLot.id}`">
    <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <a href="#">
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://bogota.gov.co/sites/default/files/styles/1050px/public/2022-01/parqueadero1.jpg"
            alt="Parking Lot Photo" />
          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <button class="text-sm">Reservar</button>
          </div>
        </div>

        <div class="mt-1 p-2 flex flex-col justify-between h-40">
          <div>
            <!-- Título y dirección -->
            <h2 class="text-slate-700 capitalize">{{ parkingLot.name }}</h2>
            <p class="mt-1 text-sm text-slate-400 capitalize">{{ parkingLot.address }}</p>
          </div>

          <div class="flex items-center justify-between">
            <!-- Mostrar horario según el día de la semana actual -->
            <div>
              <p v-if="currentDaySchedule" class="text-sm font-bold text-blue-500">
                {{ currentDaySchedule.week_day.name ?? 'Sin horario' }} :<br>
                De {{ `${currentDaySchedule.schedule.start_time.slice(0, 5) ?? 'Sin horario'} AM` }}<br>
                hasta {{ `${currentDaySchedule.schedule.end_time.slice(0, 5) ?? 'Sin horario'} PM` }}
              </p>
              <p v-else class="text-sm font-bold text-blue-500">Sin horario disponible</p>
            </div>

            <!-- Botón de reservar -->
            <div>
              <div
                class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <FontAwesomeIcon :icon="faCalendar" />
                <RouterLink :to="`/reservation-detail/${parkingLot.id}`">
                  <button class="text-sm">Reservar</button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>


      </a>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

// Importa tu interfaz de ParkingLot
import type { DaySchedule } from '@/modules/schedules/interfaces/DaySchedule';
import type { ParkingLot } from '../interfaces/parking-lot.interface';


// Define las props del componente
interface Props {
  parkingLot: ParkingLot
}
const props = defineProps<Props>()

// Calcula el horario del día actual
const today = new Date().getDay() // Día actual (0-6, domingo = 0)
const currentDaySchedule: DaySchedule | undefined = props.parkingLot.day_schedule.find(
  (schedule) => schedule.week_day.day_number === today
)
</script>
