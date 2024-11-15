<script lang="ts" setup>
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import InteractiveMap from '@/modules/common/components/InteractiveMap.vue'
import { getParkingLotsAction } from '@/modules/parking_lots/actions/get-parking-lots.action'
import ParkingLotList from '@/modules/parking_lots/components/ParkingLotList.vue'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const page = ref(Number(route.query.page || 1))

const { data: parkingLots = [], isLoading } = useQuery({
  queryKey: ['parkingLots', { page: page }],
  queryFn: () => getParkingLotsAction(page.value),
})

watch(
  () => route.query.page,
  newPage => {
    page.value = Number(newPage || 1)
  },
)
</script>

<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">
      Todos los parqueaderos
    </h1>
  </div>

  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Marcadores</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Mapa interactivo</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <span>Favoritos</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        ></polygon>
      </svg>
      <span>Ubicación</span>
    </a>
  </div>

  <div
    class="flex justify-center items-center"
    style="width: 100%; height: 400px"
  >
    <InteractiveMap
      :center="[47.41322, -1.219482]"
      :zoom="13"
      class="w-full h-full"
    />
  </div>

  <div v-if="!parkingLots" class="text-center h-[500px]">
    <h1 class="text-xl">Cargando parqueaderos</h1>
    <p>Espere por favor</p>
  </div>

  <!-- Parking lots List -->
  <ParkingLotList v-else :parkingLots="parkingLots" />

  <ButtonPagination
    :has-more-data="!!parkingLots && parkingLots.length < 10"
    :is-first-page="page === 1"
    :page="1"
  />
</template>
