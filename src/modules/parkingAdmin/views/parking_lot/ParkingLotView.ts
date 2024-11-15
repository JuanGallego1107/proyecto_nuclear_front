import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm, useFieldArray } from 'vee-validate'
import * as yup from 'yup'
import { getParkingById } from '@/modules/parking_lots/actions/get-product-by-id.action'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { createUpdateParkingAction } from '@/modules/parking_lots/actions/create-update-product.action'
import { useToast } from 'vue-toastification'

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
    CustomInput,
  },
  props: {
    parkingId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const toast = useToast()

    const {
      data: parking,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['parking', props.parkingId],
      queryFn: () => getParkingById(props.parkingId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateParking,
    } = useMutation({
      mutationFn: createUpdateParkingAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [name, nameAttrs] = defineField('name')
    const [address, addressAttrs] = defineField('address')
    const [phone_number, phoneNumberAttrs] = defineField('phone_number')
    const [nit, nitAttrs] = defineField('nit')
    const [coord_x, coordXAttrs] = defineField('coord_x')
    const [coord_y, coordYAttrs] = defineField('coord_y')

    const { fields: images } = useFieldArray<string>('images')

    const onSubmit = handleSubmit(values => {
      mutate(values)
    })

    // Validate if the parking lot was obtained correctly
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/parkings')
      }
    })

    watch(
      parking,
      () => {
        if (!parking.value) return
        resetForm({
          values: parking.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdateSucess, value => {
      if (!value) return

      toast.success('Parqueadero actualizado correctamente')
      router.replace(`/parking-admin/parking/${updateParking.value!.id}`)

      resetForm({
        values: updateParking.value,
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

      images,

      isPending,

      onSubmit,
    }
  },
})
