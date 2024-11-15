import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getReservationStateById } from '../../../reservation_states/actions/get-reservation-state-by-id.action'
import { createUpdateReservationStateAction } from '@/modules/reservation_states/actions/create-update-reservation-state.action'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
})

// Define the props interface
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

    const {
      data: state,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['state', props.stateId],
      queryFn: () => getReservationStateById(props.stateId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updateState,
    } = useMutation({
      mutationFn: createUpdateReservationStateAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [name, nameAttrs] = defineField('name')

    const onSubmit = handleSubmit(values => {
      mutate(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/reservation-states')
      }
    })

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

    watch(isUpdateSuccess, value => {
      if (!value) return

      toast.success('Método de pago actualizado correctamente')
      router.replace(`/admin/reservation-states/${updateState.value!.id}`)

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
