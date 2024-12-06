<script lang="ts" setup>
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import InteractiveMap from '@/modules/common/components/InteractiveMap.vue';
import ParkingLotList from '@/modules/parking_lots/components/ParkingLotList.vue';
import { getParkingLotsAction } from '@/modules/parking_lots/actions/get-parking-lots.action';
import { getReservationsByNumber } from '@/modules/reservations/actions/get-reservations-by-customer.action';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Reservation } from '@/modules/reservations/interfaces/reservation.interface';
import ReservationCardList from '../components/ReservationCardList.vue';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const searchQuery = ref(''); // Campo de búsqueda
const reservations = ref<Reservation[]>([]); // Resultado de las reservaciones
const isLoadingReservations = ref(false); // Estado de carga de las reservaciones

// Obtener lista de parqueaderos
const { data: parkingLots = [], isLoading } = useQuery({
  queryKey: ['parkingLots', { page: page }],
  queryFn: () => getParkingLotsAction(page.value),
});

watch(() => route.query.page, (newPage) => {
  page.value = Number(newPage || 1);
});

// Función para buscar reservaciones por cliente
const searchReservations = async () => {
  if (!searchQuery.value) return; // No buscar si no hay query
  isLoadingReservations.value = true;
  try {
    const data = await getReservationsByNumber(searchQuery.value);
    reservations.value = Array.isArray(data) ? data : Object.values(data);
    console.log('Reservaciones recibidas:', reservations.value);
  } catch (error) {
    console.error('Error fetching reservations:', error);
  } finally {
    isLoadingReservations.value = false;
  }
};
</script>

<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">Encuentra tus reservas</h1>
  </div>

  <!-- Search Bar -->
  <div class="flex justify-center mt-4">
    <input v-model="searchQuery" @keyup.enter="searchReservations" type="text"
      placeholder="Buscar por el número de reserva asignado" class="border rounded p-2 w-1/2" />
    <button @click="searchReservations" class="ml-2 px-4 py-2 bg-blue-700 text-white rounded">Buscar</button>
  </div>

  <div>
    <!-- Cargando Reservaciones -->
    <div v-if="isLoadingReservations" class="text-center mt-4">Cargando reservaciones...</div>

    <!-- Reservaciones Encontradas -->
    <div v-else-if="reservations.length > 0" class="mt-4">
      <h2 class="text-xl font-semibold text-center">Reservaciones</h2>
      <ReservationCardList :reservations="reservations" @view-details="handleViewDetails" />
    </div>

    <!-- Sin Resultados -->
    <div v-else-if="!isLoadingReservations && searchQuery">
      <p class="text-center text-gray-500 mt-4">No se encontraron reservaciones.</p>
    </div>
  </div>

  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800">
    <!-- Links -->
  </div>

  <div class="max-w-full mt-4 mx-12 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
    <div class="flex justify-center items-center" style="width: 100%; height: 400px">
      <InteractiveMap :center="[47.41322, -1.219482]" :parkingLots="parkingLots" class="w-full h-full" />
    </div>
  </div>

  <!-- Parking lots List -->
  <div v-if="!parkingLots" class="text-center h-[500px]">
    <h1 class="text-xl">Cargando parqueaderos</h1>
    <p>Espere por favor</p>
  </div>
  <ParkingLotList v-else :parkingLots="parkingLots" />
  <ButtonPagination :has-more-data="!!parkingLots && parkingLots.length < 10" :is-first-page="page === 1" :page="1" />
</template>
