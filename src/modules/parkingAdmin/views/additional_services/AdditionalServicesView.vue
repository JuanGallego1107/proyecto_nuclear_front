<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { getAdditionalServiceByParkingId } from '@/modules/additional_services/actions/get-additional-services.action'
import { deleteAdditionalServiceById } from '@/modules/additional_services/actions/delete-additional-service.action'

const route = useRoute()
const queryClient = useQueryClient()
const authUser = useAuthStore()
const toast = useToast()
const page = ref(Number(route.query.page || 1))

const { data: additionalServices = [] } = useQuery({
  queryKey: ['additionalServices', { page: page }],
  queryFn: () =>
    getAdditionalServiceByParkingId(
      page.value,
      authUser.user?.id_parking_lot ?? 1,
    ),
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['additionalServices', { page: page.value + 1 }],
    queryFn: () =>
      getAdditionalServiceByParkingId(
        page.value + 1,
        authUser.user?.id_parking_lot ?? 1,
      ),
  })
})

// Function to handle deletion
const handleDelete = async (serviceId: number) => {
  try {
    await deleteAdditionalServiceById(serviceId)
    toast.success('Servicio adicional eliminado correctamente')
    queryClient.invalidateQueries(['additionalServices'])
  } catch (error) {
    toast.error('Error al eliminar el servicio adicional')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">
        Servicios adicionales<small class="text-blue-500"></small>
      </h1>
      <RouterLink to="/parking-admin/additional-services/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Crear servicio
          adicional
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
                Costo
              </th>
              <th
                class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="service in additionalServices" :key="service.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/parking-admin/additional-services/${service.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ service.name }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">{{ `$ ${service.cost}` }}</td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink
                  :to="`/parking-admin/additional-services/${service.id}`"
                >
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(service.id)"
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
      :has-more-data="!!additionalServices && additionalServices.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
