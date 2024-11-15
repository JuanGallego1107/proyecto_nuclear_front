import { backendApi } from '@/api/backendApi'
import type { PaymentMethod } from '../interfaces/payment-method.interface'

// Function to fetch payment method by ID
export const getPaymentMethodById = async (paymentMethodId: string) => {
  // Check if the paymentMethodId is 'create', and return a default object if so
  if (paymentMethodId === 'create') {
    return {
      id: null,
      name: '',
    }
  }

  try {
    // Make an API call to fetch the payment method details by id
    const { data } = await backendApi.get<PaymentMethod>(
      `/payment-methods/${paymentMethodId}`, // Endpoint to fetch payment method by ID
    )

    // Return the fetched payment method data
    return {
      ...data, // Spread the data object and return
    }
  } catch (error) {
    // Throw an error if the API call fails
    throw new Error(`Error getting parking by id`)
  }
}
