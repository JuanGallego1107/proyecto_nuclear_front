import { backendApi } from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

export const getPaymentMethodById = async (paymentMethodId: string) => {
  if (paymentMethodId === 'create') {
    return {
      id: null,
      name: '',
    }
  }

  try {
    const { data } = await backendApi.get<PaymentMethod>(
      `/payment-methods/${paymentMethodId}`,
    )

    return {
      ...data,
    }
  } catch (error) {
    throw new Error(`Error getting parking by id`)
  }
}
