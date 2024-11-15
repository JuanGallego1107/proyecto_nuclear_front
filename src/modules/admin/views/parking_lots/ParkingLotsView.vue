<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getParkingLotsAction } from '@/modules/parking_lots/actions/get-parking-lots.action'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { deleteParkingLotById } from '@/modules/parking_lots/actions/delete-parking-lot-by-id.action'

const route = useRoute()
const toast = useToast()
const queryClient = useQueryClient()
const page = ref(Number(route.query.page || 1))

// Initialize tanstack usage for parking lot list
const { data: parkings = [] } = useQuery({
  queryKey: ['parkingLots', { page: page }],
  queryFn: () => getParkingLotsAction(page.value),
})

// Validate the cache info to get parking lot list
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['parkingLots', { page: page.value + 1 }],
    queryFn: () => getParkingLotsAction(page.value + 1),
  })
})

// Function to handle delete operation
const handleDelete = async (parkingId: number) => {
  try {
    // Action to delete parking lot by id
    await deleteParkingLotById(parkingId)
    // Success message
    toast.success('Parqueadero eliminado correctamente')
    // Invalidate and refetch the parking lot list
    queryClient.invalidateQueries(['parkingLots'])
  } catch (error) {
    // Error message
    toast.error('Error al eliminar el parqueadero')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <!-- Title -->
      <h1 class="text-3xl">
        Parqueaderos <small class="text-blue-500"></small>
      </h1>
      <!-- Create button -->
      <RouterLink to="/admin/parkings/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" />
          Crear parqueadero
        </button>
      </RouterLink>
    </div>
    <hr class="my-4" />
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <!-- Parking lots table -->
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Nombre
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Dirección
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Teléfono
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Latitud
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Altitud
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(parking, index) in parkings" :key="parking.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/parkings/${parking.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ parking.name }}
                </RouterLink>
              </td>
              <td class="w-1/3 text-left py-3 px-4">
                <span class="bg-blue-200 text-blue-600 py-1 px-3">
                  {{ parking.address }}
                </span>
              </td>
              <td class="text-left py-3 px-4">
                {{ parking.phone_number }}
              </td>
              <td class="text-left py-3 px-4">
                {{ parking.coord_x }}
              </td>
              <td class="text-left py-3 px-4">
                {{ parking.coord_y }}
              </td>
              <!-- Button funcionalities to delete and delete parking lots -->
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink :to="`/admin/parkings/${parking.id}`">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(parking.id)"
                  class="text-red-500 hover:text-red-700"
                  title="Eliminar"
                >
                  <FontAwesomeIcon :icon="faTrash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ButtonPagination
      :page="page"
      :has-more-data="!!parkings && parkings.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
