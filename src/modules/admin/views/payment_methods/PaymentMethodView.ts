import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getPaymentMethodById } from '@/modules/payment_methods/actions/get-payment-method-by-id.action'
import { createUpdatePaymentMethodAction } from '@/modules/payment_methods/actions/create-update-payment-method.action'

// Validation schema for form input using Yup
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

    // Fetch the payment method data by ID
    const {
      data: payment,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['payment', props.paymentId],
      queryFn: () => getPaymentMethodById(props.paymentId),
      retry: false,
    })

    // Mutation function to create or update the payment method
    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updatePayment,
    } = useMutation({
      mutationFn: createUpdatePaymentMethodAction,
    })

    // Setup form state and validation using vee-validate
    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [name, nameAttrs] = defineField('name')

    // Handle form submission
    const onSubmit = handleSubmit(values => {
      mutate(values)
    })

    // Redirect if there is an error fetching the payment method data
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/payment-methods')
      }
    })

    // Populate form fields when payment data is loaded
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

    // Handle successful updates
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
