<template>
  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
  >
    <!-- Link to navigate to the parking lot details (currently not functional) -->
    <a href="#">
      <div class="relative flex items-end overflow-hidden rounded-xl">
        <!-- Image of the parking lot -->
        <img
          src="https://bogota.gov.co/sites/default/files/styles/1050px/public/2022-01/parqueadero1.jpg"
          alt="Hotel Photo"
        />
        <div
          class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
        >
          <!-- Icon for adding to cart -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <!-- Button to add to cart -->
          <button class="text-sm">Add to cart</button>
        </div>
      </div>

      <div class="mt-1 p-2">
        <!-- Display parking lot name -->
        <h2 class="text-slate-700 capitalize">{{ parkingLot.name }}</h2>
        <!-- Display parking lot address -->
        <p class="mt-1 text-sm text-slate-400 capitalize">
          {{ parkingLot.address }}
        </p>

        <div class="mt-3 flex items-end justify-between">
          <!-- Display parking lot status (Open) -->
          <p class="text-lg font-bold text-blue-500">Abierto</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <!-- Calendar icon and reservation button -->
            <FontAwesomeIcon :icon="faCalendar" />

            <!-- Button to reserve the parking spot -->
            <button class="text-sm">Reservar</button>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
// Import FontAwesomeIcon component for icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Define the ParkingLot interface for typing the props
import type { ParkingLot } from '../interfaces/parking-lot.interface'

// Import the calendar icon from Font Awesome
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

// Define the component props
interface Props {
  parkingLot: ParkingLot
}

// Initialize props in the component
defineProps<Props>()
</script>
