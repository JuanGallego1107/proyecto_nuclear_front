<template>
  <!-- Wrapper div for the input and error message -->
  <div>
    <!-- Input field with dynamic type, value, and event handlers -->
    <input
      :type="type"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement)?.value ?? '',
        )
      "
      @blur="$emit('blur')"
      :class="['form-control', { 'border-red-500': error }]"
    />
    <!-- Display error message if there's an error -->
    <span class="text-red-400" v-if="error">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
// Define the properties (props) that the component accepts
interface Props {
  modelValue?: string | number // The value of the input field
  error?: string // Error message to display
  type?: 'text' | 'number' // Type of input (text or number)
}

// Set default value for type to 'text'
withDefaults(defineProps<Props>(), {
  type: 'text',
})

// Define the events that the component emits
defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
/* Custom input field styling */
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
