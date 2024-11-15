<script setup lang="ts">
import ParkingLotCard from './ParkingLotCard.vue'
import type { ParkingLot } from '../interfaces/parking-lot.interface'

interface Props {
  parkingLots: ParkingLot[]
}

const props = defineProps<Props>()

console.log(props.parkingLots)
</script>

<template>
  <section class="py-10 bg-gray-100">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ParkingLotCard
        v-for="parkingLot in parkingLots"
        :key="parkingLot.id"
        :parking-lot="parkingLot"
      />
    </div>
  </section>
</template>
