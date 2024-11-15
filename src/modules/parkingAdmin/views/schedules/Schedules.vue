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
  faClockFour,
  faClock,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { getDayScheduleByParkingId } from '@/modules/schedules/actions/get-vehicle-types.action'

const route = useRoute()
const queryClient = useQueryClient()
const authUser = useAuthStore()
const toast = useToast()
const page = ref(Number(route.query.page || 1))

const { data: schedules = [] } = useQuery({
  queryKey: ['schedules', { page: page }],
  queryFn: () =>
    getDayScheduleByParkingId(page.value, authUser.user?.id_parking_lot ?? 1),
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['schedules', { page: page.value + 1 }],
    queryFn: () =>
      getDayScheduleByParkingId(
        page.value + 1,
        authUser.user?.id_parking_lot ?? 1,
      ),
  })
})

// Function to handle deletion
const handleDelete = async (feeId: number) => {
  //   try {
  //     await deleteFeeById(feeId)
  //     toast.success('Tarifa eliminada correctamente')
  //     queryClient.invalidateQueries(['fees'])
  //   } catch (error) {
  //     toast.error('Error al eliminar la tarifa')
  //   }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">Horarios<small class="text-blue-500"></small></h1>
      <RouterLink to="">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Añadir horario de día
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
                class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Día
              </th>
              <th
                class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                N° de día
              </th>
              <th
                class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Hora inicio
              </th>
              <th
                class="w-1/4 text-left py-1 px-1 uppercase font-semibold text-sm"
              >
                Hora fin
              </th>
              <th
                class="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="schedule in schedules" :key="schedule.id_week_day">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink to="" class="hover:text-blue-500 hover:underline">
                  {{ schedule.week_day.name }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <FontAwesomeIcon :icon="faCalendarDay" />
                {{ `${schedule.week_day.day_number}` }}
              </td>
              <td class="text-left py-3 px-4">
                <FontAwesomeIcon :icon="faClockFour" class="mr-1" />
                {{ `${schedule.schedule.start_time} AM` }}
              </td>
              <td class="text-left py-3 px-4">
                <FontAwesomeIcon :icon="faClock" class="mr-1" />
                {{ `${schedule.schedule.end_time} PM` }}
              </td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink to="">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(schedule.id_week_day)"
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
      :has-more-data="!!schedules && schedules.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
