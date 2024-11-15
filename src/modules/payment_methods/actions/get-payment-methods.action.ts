import { backendApi } from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

// Action to get payment methods list by http
export const getPaymentMethodsAction = async (page: number = 1) => {
  try {
    const { data } = await backendApi.get<PaymentMethod[]>(`/payment-methods`)

    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    throw new Error('Error while fetching payment methods')
  }
}
