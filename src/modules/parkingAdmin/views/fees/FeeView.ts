import { ref, onMounted, watch, watchEffect, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getFeeById } from '@/modules/fees/actions/get-fee-by-id.action'
import { createUpdateFeeAction } from '@/modules/fees/actions/create-update-fee.action'
import { getVehicleTypesAction } from '@/modules/vehicle_types/actions/get-vehicle-types.action'

// Validation schema for form inputs
const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'), // Name is required
  cost: yup
    .number()
    .required('El costo es obligatorio') // Cost is required
    .min(0, 'El costo debe ser un valor positivo'), // Cost must be positive
  id_vehicle_type: yup.number().required('El tipo de vehículo es obligatorio'), // Vehicle type is required
})

export default defineComponent({
  components: {
    CustomInput, // Custom input component
  },
  props: {
    feeId: {
      type: String,
      required: true, // feeId is a required prop
    },
  },
  setup(props) {
    // State to hold vehicle types
    const vehicleTypes = ref<VehicleType[]>([])

    // Fetch vehicle types when the component is mounted
    onMounted(async () => {
      try {
        vehicleTypes.value = await getVehicleTypesAction()
      } catch (error) {
        toast.error('Error al cargar tipos de vehículo') // Show error if fetching fails
      }
    })

    const router = useRouter() // Router instance to navigate
    const toast = useToast() // Toast notifications for success/error messages

    // Fetch the fee details based on the feeId prop
    const {
      data: fee,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['fee', props.feeId],
      queryFn: () => getFeeById(props.feeId),
      retry: false, // Disable retries
    })

    // Mutation to create or update the fee
    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateFee,
    } = useMutation({
      mutationFn: createUpdateFeeAction, // The function that creates/updates the fee
    })

    // Form setup using vee-validate
    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema, // Attach the validation schema to the form
      })

    // Define fields for name, cost, and vehicle type
    const [name, nameAttrs] = defineField('name')
    const [cost, costAttrs] = defineField('cost')
    const [id_vehicle_type, idVehicleTypeAttrs] = defineField('id_vehicle_type')

    // Handle form submission
    const onSubmit = handleSubmit(values => {
      console.log('Enviando valores:', values) // Log submitted values
      mutate(values) // Call mutation to create/update the fee
    })

    // Watch for errors and redirect if fetching fails
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/parking-admin/fees') // Redirect to the fees list page if error occurs
      }
    })

    // Watch for fee data and reset form values when data is fetched
    watch(
      fee,
      () => {
        if (!fee.value) return // Do nothing if fee data is not available
        resetForm({
          values: fee.value, // Reset form with the fetched fee data
        })
      },
      {
        deep: true, // Watch for deep changes in the fee data
        immediate: true, // Trigger immediately when the component is mounted
      },
    )

    // Watch for update success and handle redirection and success message
    watch(isUpdateSucess, value => {
      if (!value) return // Do nothing if update has not been successful

      toast.success('Tarifa actualizada correctamente') // Show success message
      router.replace(`/parking-admin/fees/${updateFee.value!.id}`) // Redirect to the updated fee page

      resetForm({
        values: updateFee.value, // Reset form with the updated fee data
      })
    })

    return {
      values,
      errors,
      meta,

      name,
      nameAttrs,
      cost,
      costAttrs,
      id_vehicle_type,
      idVehicleTypeAttrs,

      vehicleTypes,

      isPending,
      onSubmit, // Expose onSubmit for the form submission
    }
  },
})
