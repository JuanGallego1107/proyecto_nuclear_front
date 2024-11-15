import { backendApi } from '@/api/backendApi'

interface RegisterParkingError {
  ok: false
  message: string
}

interface RegisterParkingSucess {
  ok: true
  message: string
}

export const registerParkingAction = async (
  name: string,
  address: string,
  phoneNumber: string,
  nit: string,
  coordX: string,
  coordY: string,
): Promise<RegisterParkingError | RegisterParkingSucess> => {
  console.log(name, address, phoneNumber, nit, coordX, coordY)

  try {
    const { data } = await backendApi.post('/parking-lots', {
      name,
      address,
      phone_number: phoneNumber,
      nit,
      coord_x: coordX,
      coord_y: coordY,
    })

    return {
      ok: true,
      message: 'Parqueadero creado con éxito',
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se logro completar esta acción',
    }
  }
}
