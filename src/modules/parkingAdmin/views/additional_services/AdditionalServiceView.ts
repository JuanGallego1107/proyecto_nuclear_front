import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useToast } from 'vue-toastification'
import { getAdditionalServiceById } from '@/modules/additional_services/actions/get-additional-service-by-id.action'
import { createUpdateAdditionalServiceAction } from '@/modules/additional_services/actions/create-update-additional-service.action'

// Validation schema using yup
const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'), // Name is required
  cost: yup
    .number()
    .required('El costo es obligatorio') // Cost is required
    .min(0, 'El costo debe ser un valor positivo'), // Cost must be a positive number
})

export default defineComponent({
  components: {
    CustomInput, // Importing a custom input component
  },
  props: {
    serviceId: {
      type: String, // serviceId is passed as a prop
      required: true,
    },
  },
  setup(props) {
    const router = useRouter() // Vue router for navigation
    const toast = useToast() // Toast for notifications

    // Fetch additional service details using vue-query
    const {
      data: space,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['additionalService', props.serviceId], // Unique key for query
      queryFn: () => getAdditionalServiceById(props.serviceId), // Function to fetch data
      retry: false, // Disable retry on failure
    })

    // Mutation for creating or updating the additional service
    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucess,
      data: updateService,
    } = useMutation({
      mutationFn: createUpdateAdditionalServiceAction, // Function to handle create/update
    })

    // Setup vee-validate form handling with validation schema
    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    // Define form fields with validation
    const [name, nameAttrs] = defineField('name') // Define 'name' field
    const [cost, costAttrs] = defineField('cost') // Define 'cost' field

    // Submit form handler
    const onSubmit = handleSubmit(values => {
      console.log('Enviando valores:', values) // Log values before submitting
      mutate(values) // Call the mutation (create or update)
    })

    // Watch for errors in query and navigate if error occurs
    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/parking-admin/additional-services') // Redirect to services list on error
      }
    })

    // Watch for changes in the fetched data and reset the form
    watch(
      space,
      () => {
        if (!space.value) return
        resetForm({
          values: space.value, // Reset form with fetched data
        })
      },
      {
        deep: true, // Deep watch for nested changes
        immediate: true, // Trigger immediately when the component is mounted
      },
    )

    // Watch for successful update and show notification
    watch(isUpdateSucess, value => {
      if (!value) return
      toast.success('Espacio de parqueadero actualizado correctamente') // Success toast
      router.replace(
        `/parking-admin/additional-services/${updateService.value!.id}`, // Redirect to the updated service
      )
      resetForm({
        values: updateService.value, // Reset form with updated service data
      })
    })

    // Return reactive values and methods for use in the template
    return {
      values,
      errors,
      meta,

      name,
      nameAttrs,
      cost,
      costAttrs,

      isPending, // Show loading state during mutation
      onSubmit, // Handle form submission
    }
  },
})
