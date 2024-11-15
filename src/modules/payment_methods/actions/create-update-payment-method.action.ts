import { backendApi } from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

export const createUpdatePaymentMethodAction = async (
  payment: Partial<PaymentMethod>,
) => {
  const paymentId = payment.id

  payment = cleanPaymentMethodForCreateUpdate(payment)

  console.log(paymentId)

  if (paymentId && paymentId !== null) {
    console.log('DEBUGG')
    // Actualizar parqueadero
    return await updatePaymentMethod(paymentId, payment)
  }

  // Crear parqueadero
  return await createPaymentMethod(payment)
}

const cleanPaymentMethodForCreateUpdate = (payment: Partial<PaymentMethod>) => {
  delete payment.id

  return payment
}

const updatePaymentMethod = async (
  paymentId: number,
  payment: Partial<PaymentMethod>,
) => {
  try {
    const { data } = await backendApi.put<PaymentMethod>(
      `/payment-methods/${paymentId}`,
      payment,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating product')
  }
}

const createPaymentMethod = async (payment: Partial<PaymentMethod>) => {
  try {
    const { data } = await backendApi.post<PaymentMethod>(
      `/payment-methods`,
      payment,
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating product')
  }
}
