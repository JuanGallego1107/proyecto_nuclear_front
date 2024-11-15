import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getPaymentMethodById } from '@/modules/payment_methods/actions/get-payment-method-by-id.action'
import { createUpdatePaymentMethodAction } from '@/modules/payment_methods/actions/create-update-payment-method.action'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
})

export default defineComponent({
  components: {
    CustomInput,
  },
  props: {
    paymentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const toast = useToast()

    const {
      data: payment,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['payment', props.paymentId],
      queryFn: () => getPaymentMethodById(props.paymentId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updatePayment,
    } = useMutation({
      mutationFn: createUpdatePaymentMethodAction,
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
        router.replace('/admin/payment-methods')
      }
    })

    watch(
      payment,
      () => {
        if (!payment.value) return
        resetForm({
          values: payment.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdateSucess, value => {
      if (!value) return

      toast.success('Método de pago actualizado correctamente')
      router.replace(`/admin/payment-methods/${updatePayment.value!.id}`)

      resetForm({
        values: updatePayment.value,
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
