import { backendApi } from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

// Function to create or update a payment method
export const createUpdatePaymentMethodAction = async (
  payment: Partial<PaymentMethod>,
) => {
  // Get the payment method ID
  const paymentId = payment.id

  // Clean up the payment object for create/update operation
  payment = cleanPaymentMethodForCreateUpdate(payment)

  console.log(paymentId)

  // Check if there is a valid paymentId to decide between update or create
  if (paymentId && paymentId !== null) {
    console.log('DEBUGG')
    // Update the payment method
    return await updatePaymentMethod(paymentId, payment)
  }

  // Create a new payment method if no valid paymentId
  return await createPaymentMethod(payment)
}

// Function to remove the 'id' field before creating or updating payment method
const cleanPaymentMethodForCreateUpdate = (payment: Partial<PaymentMethod>) => {
  // Remove the id field from the payment object
  delete payment.id

  return payment
}

// Function to update an existing payment method
const updatePaymentMethod = async (
  paymentId: number,
  payment: Partial<PaymentMethod>,
) => {
  try {
    // Make API call to update the payment method
    const { data } = await backendApi.put<PaymentMethod>(
      `/payment-methods/${paymentId}`,
      payment,
    )
    return data
  } catch (error) {
    // Log error if API call fails
    console.log(error)
    throw new Error('Error updating product')
  }
}

// Function to create a new payment method
const createPaymentMethod = async (payment: Partial<PaymentMethod>) => {
  try {
    // Make API call to create a new payment method
    const { data } = await backendApi.post<PaymentMethod>(
      `/payment-methods`,
      payment,
    )
    return data
  } catch (error) {
    // Log error if API call fails
    console.log(error)
    throw new Error('Error creating product')
  }
}
