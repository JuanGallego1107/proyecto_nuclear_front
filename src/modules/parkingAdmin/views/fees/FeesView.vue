<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlus,
  faEdit,
  faTrash,
  faDollar,
  faMotorcycle,
  faCar,
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { getFeesByParkingId } from '@/modules/fees/actions/get-fees.action'
import { deleteFeeById } from '@/modules/fees/actions/delete-fee.action'

const route = useRoute() // Access the current route
const queryClient = useQueryClient() // Vue Query client for query invalidation and prefetching
const authUser = useAuthStore() // Auth store to get the user information
const toast = useToast() // Toast notification service for feedback
const page = ref(Number(route.query.page || 1)) // Current page for pagination

// Fetch fees by parking lot ID
const { data: fees = [] } = useQuery({
  queryKey: ['fees', { page: page }], // Unique query key for fees
  queryFn: () =>
    getFeesByParkingId(page.value, authUser.user?.id_parking_lot ?? 1), // Fetch data with parking lot ID
})

// Prefetch next page of fees for smooth pagination
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['fees', { page: page.value + 1 }],
    queryFn: () =>
      getFeesByParkingId(page.value + 1, authUser.user?.id_parking_lot ?? 1),
  })
})

// Function to handle deletion of a fee
const handleDelete = async (feeId: number) => {
  try {
    await deleteFeeById(feeId) // Call the deletion API action
    toast.success('Tarifa eliminada correctamente') // Show success toast
    queryClient.invalidateQueries(['fees']) // Invalidate query to refetch the list
  } catch (error) {
    toast.error('Error al eliminar la tarifa') // Show error toast on failure
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">Tarifas<small class="text-blue-500"></small></h1>
      <RouterLink to="/parking-admin/fees/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Crear tarifa
        </button>
      </RouterLink>
    </div>
    <hr class="my-4" />
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Nombre de la tarifa
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Costo
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Tipo de vehículo
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="fee in fees" :key="fee.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/parking-admin/fees/${fee.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ fee.name }}
                  <!-- Link to fee details -->
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <FontAwesomeIcon :icon="faDollar" />
                <!-- Dollar icon for cost -->
                {{ `${fee.cost}` }}
                <!-- Display fee cost -->
              </td>
              <td class="text-left py-3 px-4">
                <FontAwesomeIcon
                  :icon="
                    fee.vehicle_type.name === 'Moto' ? faMotorcycle : faCar
                  "
                  class="mr-1"
                />
                {{ `${fee.vehicle_type.name}` }}
                <!-- Display vehicle type -->
              </td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink :to="`/parking-admin/fees/${fee.id}`">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                    <!-- Edit button -->
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(fee.id)"
                  class="text-red-500 hover:text-red-700"
                  title="Eliminar"
                >
                  <FontAwesomeIcon :icon="faTrash" />
                  <!-- Trash icon for deletion -->
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination component -->
    <ButtonPagination
      :page="page"
      :has-more-data="!!fees && fees.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
