<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { getParkingSpacesByParkingId } from '@/modules/parking_spaces/actions/get-parking-spaces.action'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { deleteParkingSpaceById } from '@/modules/parking_spaces/actions/delete-parking-space.action'

// Access current route information (used for pagination)
const route = useRoute()
// Create an instance of the query client for managing cache
const queryClient = useQueryClient()
// Access user authentication data (user's parking lot info)
const authUser = useAuthStore()
// Toast notifications for success/error messages
const toast = useToast()
// Set the initial page based on the query parameter or default to 1
const page = ref(Number(route.query.page || 1))

// Query to fetch parking spaces for the current parking lot and page
const { data: parkingSpaces = [] } = useQuery({
  // Cache key based on page number
  queryKey: ['parkingSpaces', { page: page }],
  queryFn: () =>
    // Fetch parking spaces for the specific parking lot
    getParkingSpacesByParkingId(page.value, authUser.user?.id_parking_lot ?? 1),
})

// Pre-fetch the next page of parking spaces for smooth pagination
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['parkingSpaces', { page: page.value + 1 }], // Pre-fetch the next page based on the current page
    queryFn: () =>
      getParkingSpacesByParkingId(
        page.value + 1,
        // Use current parking lot ID for the query
        authUser.user?.id_parking_lot ?? 1,
      ),
  })
})

// Function to handle deletion of a parking space
const handleDelete = async (spaceId: number) => {
  try {
    // Attempt to delete the parking space by its ID
    await deleteParkingSpaceById(spaceId)
    toast.success('Espacio de parqueadero eliminado correctamente')
    queryClient.invalidateQueries(['parkingSpaces'])
  } catch (error) {
    toast.error('Error al eliminar el espacio de parqueadero')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">
        Espacios de parqueadero<small class="text-blue-500"></small>
      </h1>
      <RouterLink to="/parking-admin/parking-spaces/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Crear espacio de
          parqueadero
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
                Espacio
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Estado
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="space in parkingSpaces" :key="space.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/parking-admin/parking-spaces/${space.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ space.space_number }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">Activo</td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink :to="`/parking-admin/parking-spaces/${space.id}`">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(space.id)"
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
      :has-more-data="!!parkingSpaces && parkingSpaces.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
