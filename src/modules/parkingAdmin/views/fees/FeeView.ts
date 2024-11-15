import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getFeeById } from '@/modules/fees/actions/get-fee-by-id.action'
import { createUpdateFeeAction } from '@/modules/fees/actions/create-update-fee.action'
import { getVehicleTypesAction } from '@/modules/vehicle_types/actions/get-vehicle-types.action'

// Esquema de validación
const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  cost: yup
    .number()
    .required('El costo es obligatorio')
    .min(0, 'El costo debe ser un valor positivo'),
  id_vehicle_type: yup.number().required('El tipo de vehículo es obligatorio'),
})

export default defineComponent({
  components: {
    CustomInput,
  },
  props: {
    feeId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // State for vehicle types
    const vehicleTypes = ref<VehicleType[]>([])

    // Fetch vehicle types on component mount
    onMounted(async () => {
      try {
        vehicleTypes.value = await getVehicleTypesAction()
      } catch (error) {
        toast.error('Error al cargar tipos de vehículo')
      }
    })

    const router = useRouter()
    const toast = useToast()

    const {
      data: fee,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['fee', props.feeId],
      queryFn: () => getFeeById(props.feeId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateFee,
    } = useMutation({
      mutationFn: createUpdateFeeAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    // Define fields `name`, `cost`, and `id_vehicle_type`
    const [name, nameAttrs] = defineField('name')
    const [cost, costAttrs] = defineField('cost')
    const [id_vehicle_type, idVehicleTypeAttrs] = defineField('id_vehicle_type')

    const onSubmit = handleSubmit(values => {
      console.log('Enviando valores:', values)
      mutate(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/parking-admin/fees')
      }
    })

    watch(
      fee,
      () => {
        if (!fee.value) return
        resetForm({
          values: fee.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdateSucess, value => {
      if (!value) return

      toast.success('Tarifa actualizada correctamente')
      router.replace(`/parking-admin/fees/${updateFee.value!.id}`)

      resetForm({
        values: updateFee.value,
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
      onSubmit,
    }
  },
})
