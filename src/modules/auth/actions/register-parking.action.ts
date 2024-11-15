import { backendApi } from '@/api/backendApi'
// Interface for error response when registering parking
interface RegisterParkingError {
  ok: false
  message: string
}

// Interface for successful response when registering parking
interface RegisterParkingSucess {
  ok: true
  message: string
}

// Function to handle the action of registering a parking lot
export const registerParkingAction = async (
  name: string,
  address: string,
  phoneNumber: string,
  nit: string,
  coordX: string,
  coordY: string,
): Promise<RegisterParkingError | RegisterParkingSucess> => {
  console.log(name, address, phoneNumber, nit, coordX, coordY) // Log inputs for debugging

  try {
    // Sends a POST request to the backend to create a new parking lot
    const { data } = await backendApi.post('/parking-lots', {
      name,
      address,
      phone_number: phoneNumber,
      nit,
      coord_x: coordX,
      coord_y: coordY,
    })

    // Returns success message if the request is successful
    return {
      ok: true,
      message: 'Parqueadero creado con éxito',
    }
  } catch (error) {
    // Returns error message if the request fails
    return {
      ok: false,
      message: 'No se logro completar esta acción',
    }
  }
}
