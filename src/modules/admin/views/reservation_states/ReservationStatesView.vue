<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getReservationStateAction } from '@/modules/reservation_states/actions/get-reservation-states.action'
import { useToast } from 'vue-toastification'
import { deleteReservationStateById } from '@/modules/reservation_states/actions/delete-reservation-state.action'

const route = useRoute()
const toast = useToast()
const queryClient = useQueryClient()
const page = ref(Number(route.query.page || 1))

const { data: reservationStates = [] } = useQuery({
  queryKey: ['reservationStates', { page: page }],
  queryFn: () => getReservationStateAction(page.value),
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['reservationStates', { page: page.value + 1 }],
    queryFn: () => getReservationStateAction(page.value + 1),
  })
})

// Function to handle deletion
const handleDelete = async (stateId: number) => {
  try {
    await deleteReservationStateById(stateId)
    toast.success('Estado de reserva eliminado correctamente')
    // Invalidate and refetch the payment methods list
    queryClient.invalidateQueries(['reservationStates'])
  } catch (error) {
    toast.error('Error al eliminar el estado de reserva')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">
        Estados de reserva <small class="text-blue-500"></small>
      </h1>
      <RouterLink to="/admin/reservation-states/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" />
          Crear estado de reserva
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
                Nombre
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
            <tr v-for="state in reservationStates" :key="state.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/reservation-states/${state.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ state.name }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">Activo</td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink :to="`/admin/reservation-states/${state.id}`">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(state.id)"
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
      :has-more-data="!!reservationStates && reservationStates.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
