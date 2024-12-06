import {
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
  computed,
} from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getPaymentMethodsAction } from '@/modules/payment_methods/actions/get-payment-methods.action'
import type { PaymentMethod } from '@/modules/payment_methods/interfaces/payment-method.interface'
import { getParkingById } from '@/modules/parking_lots/actions/get-parking-by-id.action'
import type { ParkingLot } from '@/modules/parking_lots/interfaces/parking-lot.interface'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createUpdateReservationAction } from '@/modules/reservations/actions/create-update-reservation.action'

const validationSchema = yup.object({
  start_date: yup
    .date()
    .required('La fecha de inicio es obligatoria')
    .test(
      'start-date',
      'La fecha de inicio no puede ser mayor a la fecha de finalización',
      function (startDate) {
        const endDate = this.parent.end_date
        if (!startDate || !endDate) return true
        return new Date(startDate) <= new Date(endDate)
      },
    ),
  end_date: yup
    .date()
    .required('La fecha de finalización es obligatoria')
    .test(
      'end-date',
      'La fecha de finalización debe ser mayor a la fecha de inicio',
      function (endDate) {
        const startDate = this.parent.start_date
        if (!startDate || !endDate) return true
        return new Date(endDate) >= new Date(startDate)
      },
    ),
  customer_name: yup.string().required('El nombre del cliente es obligatorio'),
  customer_email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo del cliente es obligatorio'),
  customer_id: yup.string().required('El ID del cliente es obligatorio'),
  id_fee: yup.string().required('El ID de la tarifa es obligatorio'),
  id_payment_method: yup
    .string()
    .required('El ID del método de pago es obligatorio'),
  id_parking_space: yup
    .string()
    .required('El ID del espacio de parqueadero es obligatorio'),
})

export default defineComponent({
  components: {
    CustomInput,
    FontAwesomeIcon,
  },
  props: {
    parkingId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const paymentMethods = ref<PaymentMethod[]>([])
    const parkingLotDetail = ref<ParkingLot | null>(null)
    const router = useRouter()
    const toast = useToast()

    onMounted(async () => {
      try {
        paymentMethods.value = await getPaymentMethodsAction()
      } catch (error) {
        toast.error('Error al cargar metodos de pago')
      }
    })

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
      isSuccess: isReservationSuccess,
    } = useMutation({
      mutationFn: createUpdateReservationAction,
      onSuccess: () => {
        toast.success('Reserva realizada con éxito')
        router.replace('/payment-gateway')
      },
      onError: error => {
        toast.error('Error al crear la reserva: ' + error.message)
      },
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [start_date, startDateAttrs] = defineField('start_date')
    const [end_date, endDateAttrs] = defineField('end_date')
    const [customer_name, customerNameAttrs] = defineField('customer_name')
    const [customer_email, customerEmailAttrs] = defineField('customer_email')
    const [customer_id, customerIdAttrs] = defineField('customer_id')
    const [id_fee, idFeeAttrs] = defineField('id_fee')
    const [id_payment_method, idPaymentMethodAttrs] =
      defineField('id_payment_method')
    const [id_parking_space, idParkingSpaceAttrs] =
      defineField('id_parking_space')

    const totalCost = computed(() => {
      if (
        !parkingLotDetail.value ||
        !id_fee.value ||
        !start_date.value ||
        !end_date.value
      ) {
        return 0
      }

      const selectedFee = parkingLotDetail.value.fee.find(
        f => f.id === id_fee.value,
      )
      if (!selectedFee) {
        return 0
      }

      if (selectedFee.name.toLowerCase().includes('hora')) {
        const startDateTime = new Date(start_date.value)
        const endDateTime = new Date(end_date.value)
        const diffInMilliseconds =
          endDateTime.getTime() - startDateTime.getTime()
        const diffInHours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60))

        return diffInHours * selectedFee.cost
      }

      return selectedFee.cost
    })

    const onSubmit = handleSubmit(async values => {
      try {
        const reservationData = {
          start_date: values.start_date,
          end_date: values.end_date,
          customer_name: values.customer_name,
          customer_email: values.customer_email,
          customer_id: values.customer_id,
          id_fee: values.id_fee,
          id_payment_method: values.id_payment_method,
          id_parking_space: values.id_parking_space,
          total: totalCost.value,
          // Asegurándonos que id sea undefined para que siempre cree uno nuevo
          id: undefined,
        }

        await mutate(reservationData)
      } catch (error) {
        console.error('Error en el envío del formulario:', error)
        toast.error('Error al procesar la reserva')
      }
    })

    watch(
      parking,
      () => {
        if (!parking.value) return
        parkingLotDetail.value = parking.value
        resetForm({
          values: parking.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    return {
      values,
      errors,
      meta,
      start_date,
      startDateAttrs,
      end_date,
      endDateAttrs,
      customer_name,
      customerNameAttrs,
      customer_email,
      customerEmailAttrs,
      customer_id,
      customerIdAttrs,
      id_fee,
      idFeeAttrs,
      id_payment_method,
      idPaymentMethodAttrs,
      id_parking_space,
      idParkingSpaceAttrs,
      paymentMethods,
      parkingLotDetail,
      totalCost,
      isPending,
      onSubmit,
      faStarHalfStroke,
      faStar,
    }
  },
})
