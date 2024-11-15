import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm, useFieldArray } from 'vee-validate'
import * as yup from 'yup'
import { getParkingById } from '@/modules/parking_lots/actions/get-product-by-id.action'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { createUpdateParkingAction } from '@/modules/parking_lots/actions/create-update-product.action'
import { useToast } from 'vue-toastification'

// Form Validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
  address: yup.string().required('La dirección es obligatoria'),
  phone_number: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^\d+$/, 'El teléfono debe ser numérico'),
  nit: yup.string().required('El NIT es obligatorio'),
  coord_x: yup
    .number()
    .required('La latitud es obligatoria')
    .typeError('Debe ser un número'),
  coord_y: yup
    .number()
    .required('La altitud es obligatoria')
    .typeError('Debe ser un número'),
})

export default defineComponent({
  components: {
    CustomInput, // Custom input component for form fields
  },
  props: {
    parkingId: {
      type: String,
      required: true, // parkingId is a required prop
    },
  },
  setup(props) {
    const router = useRouter() // Router instance to navigate
    const toast = useToast() // Toast notifications for success/error messages

    // Query to fetch parking details using the parkingId prop
    const {
      data: parking,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['parking', props.parkingId],
      queryFn: () => getParkingById(props.parkingId),
      retry: false, // Disable retries
    })

    // Mutation for creating or updating the parking record
    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateParking,
    } = useMutation({
      mutationFn: createUpdateParkingAction, // Action to create/update parking data
    })

    // Form setup using vee-validate
    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema, // Attach the validation schema to the form
      })

    // Define fields for name, address, phone number, NIT, and coordinates
    const [name, nameAttrs] = defineField('name')
    const [address, addressAttrs] = defineField('address')
    const [phone_number, phoneNumberAttrs] = defineField('phone_number')
    const [nit, nitAttrs] = defineField('nit')
    const [coord_x, coordXAttrs] = defineField('coord_x')
    const [coord_y, coordYAttrs] = defineField('coord_y')

    // Define a field array for images
    const { fields: images } = useFieldArray<string>('images')

    // Handle form submission
    const onSubmit = handleSubmit(values => {
      mutate(values) // Trigger the mutation to create/update the parking record
    })

    // Watch for error state and redirect if fetching fails
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/parkings') // Redirect to parking list if error occurs
      }
    })

    // Watch for parking data changes and reset form values when data is fetched
    watch(
      parking,
      () => {
        if (!parking.value) return // Do nothing if parking data is not available
        resetForm({
          values: parking.value, // Reset form with the fetched parking data
        })
      },
      {
        deep: true, // Watch for deep changes in the parking data
        immediate: true, // Trigger immediately when the component is mounted
      },
    )

    // Watch for update success and handle redirection and success message
    watch(isUpdateSucess, value => {
      if (!value) return // Do nothing if update has not been successful

      toast.success('Parqueadero actualizado correctamente') // Show success message
      router.replace(`/parking-admin/parking/${updateParking.value!.id}`) // Redirect to the updated parking page

      resetForm({
        values: updateParking.value, // Reset form with the updated parking data
      })
    })

    return {
      values,
      errors,
      meta,

      name,
      nameAttrs,
      address,
      addressAttrs,
      phone_number,
      phoneNumberAttrs,
      nit,
      nitAttrs,
      coord_x,
      coordXAttrs,
      coord_y,
      coordYAttrs,

      images, // Expose the images field array for the form

      isPending, // Expose isPending to manage the loading state

      onSubmit, // Expose onSubmit for the form submission
    }
  },
})
