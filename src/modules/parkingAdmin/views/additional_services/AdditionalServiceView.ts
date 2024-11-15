import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { createUpdateParkingSpaceAction } from '@/modules/parking_spaces/actions/create-update-parking-space.action'
import { getAdditionalServiceById } from '@/modules/additional_services/actions/get-additional-service-by-id.action'
import { createUpdateAdditionalServiceAction } from '@/modules/additional_services/actions/create-update-additional-service.action'

// Esquema de validación
const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  cost: yup
    .number()
    .required('El costo es obligatorio')
    .min(0, 'El costo debe ser un valor positivo'),
})

export default defineComponent({
  components: {
    CustomInput,
  },
  props: {
    serviceId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const toast = useToast()

    const {
      data: space,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['additionalService', props.serviceId],
      queryFn: () => getAdditionalServiceById(props.serviceId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateService,
    } = useMutation({
      mutationFn: createUpdateAdditionalServiceAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    // Define solo los campos `name` y `cost`
    const [name, nameAttrs] = defineField('name')
    const [cost, costAttrs] = defineField('cost')

    const onSubmit = handleSubmit(values => {
      console.log('Enviando valores:', values)
      mutate(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/parking-admin/additional-services')
      }
    })

    watch(
      space,
      () => {
        if (!space.value) return
        resetForm({
          values: space.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdateSucess, value => {
      if (!value) return

      toast.success('Espacio de parqueadero actualizado correctamente')
      router.replace(
        `/parking-admin/additional-services/${updateService.value!.id}`,
      )

      resetForm({
        values: updateService.value,
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

      isPending,
      onSubmit,
    }
  },
})
