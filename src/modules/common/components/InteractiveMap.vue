<template>
  <div class="map-wrapper">
    <!-- Contenedor del mapa -->
    <div class="map-container">
      <l-map ref="map" v-model:zoom="zoom" :center="[4.533816, -75.674637]" class="w-full h-full">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
          name="OpenStreetMap"></l-tile-layer>

        <l-marker v-for="(parkingLot, index) in parkingLots" :key="index"
          :lat-lng="[parkingLot.coord_x, parkingLot.coord_y]" @click="openModal(parkingLot)">
          <l-tooltip>{{ parkingLot.name }}</l-tooltip>
        </l-marker>
      </l-map>
    </div>

    <!-- Overlay y Modal -->
    <div v-if="dialogVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <article class="rounded-xl bg-white p-3 shadow-lg">
          <div class="relative flex items-end overflow-hidden rounded-xl">
            <img src="https://bogota.gov.co/sites/default/files/styles/1050px/public/2022-01/parqueadero1.jpg"
              alt="Parking Lot Photo" class="w-full" />
            <div
              class="absolute top-3 right-3 flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <button class="text-sm" @click="redirectToDetails">Reservar</button>
            </div>
          </div>

          <div class="mt-1 p-2">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-slate-700 capitalize">{{ selectedParkingLot?.name }}</h2>
                <p class="mt-1 text-sm text-slate-400 capitalize">{{ selectedParkingLot?.address }}</p>
              </div>

              <div class="text-right">
                <p v-if="currentDaySchedule" class="text-sm font-bold text-blue-500">
                  {{ currentDaySchedule.week_day.name ?? 'Sin horario' }} :<br>
                  De {{ `${currentDaySchedule.schedule.start_time.slice(0, 5) ?? 'Sin horario'} AM` }}<br>
                  hasta {{ `${currentDaySchedule.schedule.end_time.slice(0, 5) ?? 'Sin horario'} PM` }}
                </p>
                <p v-else class="text-sm font-bold text-blue-500">Sin horario disponible</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LTileLayer, LTooltip } from '@vue-leaflet/vue-leaflet';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { ParkingLot } from '@/modules/parking_lots/interfaces/parking-lot.interface';
import type { DaySchedule } from '@/modules/schedules/interfaces/DaySchedule';

// Props
defineProps<{
  parkingLots: Array<ParkingLot>
}>();

// Estado
const dialogVisible = ref(false);
const selectedParkingLot = ref<ParkingLot | null>(null);
const router = useRouter();
const zoom = ref(15);

// Computed
const currentDaySchedule = computed(() => {
  if (!selectedParkingLot.value?.day_schedule) return undefined;

  const today = new Date().getDay();
  return selectedParkingLot.value.day_schedule.find(
    (schedule) => schedule.week_day.day_number === today
  );
});

// Métodos
const openModal = (parkingLot: ParkingLot) => {
  selectedParkingLot.value = parkingLot;
  dialogVisible.value = true;
};

const closeModal = () => {
  dialogVisible.value = false;
};

const redirectToDetails = () => {
  if (selectedParkingLot.value?.id) {
    router.push(`/reservation-detail/${selectedParkingLot.value.id}`);
    dialogVisible.value = false;
  }
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
}

.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 90%;
  max-width: 32rem;
  border-radius: 0.5rem;
}

:deep(.leaflet-control-container) {
  z-index: 1;
}
</style>