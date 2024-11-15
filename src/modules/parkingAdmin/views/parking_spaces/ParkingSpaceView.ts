import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getParkingSpaceById } from '@/modules/parking_spaces/actions/get-parking-space-by-id.action'
import { createUpdateParkingSpaceAction } from '@/modules/parking_spaces/actions/create-update-parking-space.action'

const validationSchema = yup.object({
  space_number: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
})

export default defineComponent({
  components: {
    CustomInput,
  },
  props: {
    spaceId: {
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
      queryKey: ['parkingSpace', props.spaceId],
      queryFn: () => getParkingSpaceById(props.spaceId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateSpace,
    } = useMutation({
      mutationFn: createUpdateParkingSpaceAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [space_number, spaceNumberAttrs] = defineField('space_number')

    const onSubmit = handleSubmit(values => {
      console.log(values)
      mutate(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/parking-admin/parking-spaces')
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
      router.replace(`/parking-admin/parking-spaces/${updateSpace.value!.id}`)

      resetForm({
        values: updateSpace.value,
      })
    })

    return {
      values,
      errors,
      meta,

      space_number,
      spaceNumberAttrs,

      isPending,

      onSubmit,
    }
  },
})
