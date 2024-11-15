<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getPaymentMethodsAction } from '@/modules/payment_methods/actions/get-payment-methods.action'
import { useToast } from 'vue-toastification'
import { deletePaymentMethodById } from '@/modules/payment_methods/actions/delete-payment-method.action'

const route = useRoute()
const queryClient = useQueryClient()
const toast = useToast()
const page = ref(Number(route.query.page || 1))

const { data: paymentMethods = [] } = useQuery({
  queryKey: ['paymentMethods', { page: page }],
  queryFn: () => getPaymentMethodsAction(page.value),
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['paymentMethods', { page: page.value + 1 }],
    queryFn: () => getPaymentMethodsAction(page.value + 1),
  })
})

// Function to handle deletion
const handleDelete = async (paymentMethodId: number) => {
  try {
    await deletePaymentMethodById(paymentMethodId)
    toast.success('Método de pago eliminado correctamente')
    // Invalidate and refetch the payment methods list
    queryClient.invalidateQueries(['paymentMethods'])
  } catch (error) {
    toast.error('Error al eliminar el método de pago')
  }
}
</script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">
        Métodos de pago <small class="text-blue-500"></small>
      </h1>
      <RouterLink to="/admin/payment-methods/create">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Crear método de pago
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
            <tr v-for="payment in paymentMethods" :key="payment.id">
              <td class="w-1/3 text-left py-3 px-4">
                <RouterLink
                  :to="`/admin/payment-methods/${payment.id}`"
                  class="hover:text-blue-500 hover:underline"
                >
                  {{ payment.name }}
                </RouterLink>
              </td>
              <td class="text-left py-3 px-4">Activo</td>
              <td class="text-left py-3 px-4 flex space-x-2">
                <RouterLink :to="`/admin/payment-methods/${payment.id}`">
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <FontAwesomeIcon :icon="faEdit" />
                  </button>
                </RouterLink>
                <button
                  @click="handleDelete(payment.id)"
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
      :has-more-data="!!paymentMethods && paymentMethods.length < 10"
      :is-first-page="page == 1"
    />
  </div>
</template>
