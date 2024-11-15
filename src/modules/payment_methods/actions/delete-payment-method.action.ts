import { backendApi } from '@/api/backendApi'

export const deletePaymentMethodById = async (paymentMethodId: number) => {
  try {
    await backendApi.delete(`/payment-methods/${paymentMethodId}`)
  } catch (error) {
    throw new Error(`Error getting parking by id`)
  }
}
