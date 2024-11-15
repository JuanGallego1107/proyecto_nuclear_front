import { backendApi } from '@/api/backendApi'
import type { Fee } from '../interfaces/Fee.interface'

export const createUpdateFeeAction = async (fee: Partial<Fee>) => {
  const feeId = fee.id

  fee = cleanFeeForCreateUpdate(fee)

  if (feeId && feeId !== null) {
    return await updateFee(feeId, fee)
  }

  // Create fee
  return await createFee(fee)
}

// Clean Fee atributtes for updateing or creating
const cleanFeeForCreateUpdate = (fee: Partial<Fee>) => {
  delete fee.id

  return fee
}

// Update fee by id
const updateFee = async (feeId: number, fee: Partial<Fee>) => {
  try {
    const { data } = await backendApi.put<Fee>(`/fees/${feeId}`, fee)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error updating fee')
  }
}

// Create fee object
const createFee = async (fee: Partial<Fee>) => {
  try {
    const { data } = await backendApi.post<Fee>(`/fees`, fee)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error creating fee')
  }
}
