import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getReservationStateById } from '../../../reservation_states/actions/get-reservation-state-by-id.action'
import { createUpdateReservationStateAction } from '@/modules/reservation_states/actions/create-update-reservation-state.action'

// Define validation schema using yup
const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio') // Required validation
    .min(3, 'Debe tener al menos 3 caracteres'), // Minimum length validation
})

// Define props interface
interface Props {
  stateId: string
}

export default defineComponent({
  components: {
    CustomInput,
  },
  props: {
    stateId: {
      type: String,
      required: true,
    },
  },
  setup(props: Props) {
    const router = useRouter()
    const toast = useToast()

    // Query to fetch state details by ID
    const {
      data: state,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['state', props.stateId],
      queryFn: () => getReservationStateById(props.stateId),
      retry: false,
    })

    // Mutation to update reservation state
    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updateState,
    } = useMutation({
      mutationFn: createUpdateReservationStateAction,
    })

    // Form handling setup with validation
    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    // Define field for name input
    const [name, nameAttrs] = defineField('name')

    // Form submit handler
    const onSubmit = handleSubmit(values => {
      mutate(values)
    })

    // Watch for errors and navigate back if query fails
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/reservation-states')
      }
    })

    // Watch for state data changes and reset form values accordingly
    watch(
      state,
      () => {
        if (!state.value) return
        resetForm({
          values: state.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    // Watch for successful update and navigate to updated reservation state
    watch(isUpdateSuccess, value => {
      if (!value) return

      toast.success('Estado de reserva actualizado correctamente')
      router.replace(`/admin/reservation-states/${updateState.value!.id}`)

      // Reset form with updated state values
      resetForm({
        values: updateState.value,
      })
    })

    return {
      values,
      errors,
      meta,

      name,
      nameAttrs,

      isPending,

      onSubmit,
    }
  },
})
