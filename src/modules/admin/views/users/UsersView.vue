<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { getUsersAction } from '@/modules/users/actions/get-users.action'
import { useToast } from 'vue-toastification'
import { updateUserState } from '@/modules/users/actions/update-user.action'

const route = useRoute()
const queryClient = useQueryClient()
const toast = useToast()
const page = ref(Number(route.query.page || 1))

const { data: users = [] } = useQuery({
  queryKey: ['users', { page: page }],
  queryFn: () => getUsersAction(page.value),
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['users', { page: page.value + 1 }],
    queryFn: () => getUsersAction(page.value + 1),
  })
})

const handleStateChange = async (userId: number, newStateId: string) => {
  try {
    await updateUserState(userId, { state: newStateId })
    toast.success('Estado del usuario actualizado correctamente')
    // Refreshes the list
    queryClient.invalidateQueries(['users'])
  } catch (error) {
    toast.error('Error al actualizar el estado del usuario')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">Usuarios del sistema</h1>
    </div>
    <hr class="my-4" />
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4">Nombre</th>
              <th class="w-1/3 text-left py-3 px-4">Nombre de usuario</th>
              <th class="text-left py-3 px-4">Correo</th>
              <th class="text-left py-3 px-4">Teléfono</th>
              <th class="text-left py-3 px-4">Estado</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="user in users" :key="user.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/users/${user.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ user.name }}
                </RouterLink>
              </td>
              <td class="w-1/3 text-left py-3 px-4">
                <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-md">{{
                  user.user_name
                }}</span>
              </td>
              <td class="text-left py-3 px-4">{{ user.email }}</td>
              <td class="text-left py-3 px-4">{{ user.phone_number }}</td>
              <td class="text-left py-3 px-4">
                <select
                  :value="user.state"
                  @change="handleStateChange(user.id, $event.target.value)"
                  :class="{
                    'text-green-500': user.state == '1',
                    'text-red-500': user.state == '2',
                  }"
                  class="bg-gray-100 border border-gray-300 px-2 py-1 rounded"
                >
                  <option :value="1" class="text-green-500">Activo</option>
                  <option :value="2" class="text-red-500">Inactivo</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ButtonPagination
      :page="page"
      :has-more-data="!!users && users.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
