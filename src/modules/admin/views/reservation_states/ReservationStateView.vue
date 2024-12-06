<script src="./ReservationStateView.ts" lang="ts"></script>

<template>
  <!-- Container for the header section -->
  <div class="bg-white px-5 py-2 rounded">
    <!-- Display the header with the current state name -->
    <h1 class="text-3xl">
      Estados de reserva: <small class="text-blue-500">{{ name }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <!-- Form for updating reservation states -->
  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- First part of the form -->
      <div class="mb-4">
        <!-- Label for the name input -->
        <label for="name" class="form-label">Nombre</label>
        <!-- Custom input component for the name field -->
        <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
      </div>
    </div>

    <!-- Container for the submit button -->
    <div class="my-4 text-right">
      <!-- Submit button for saving the form data -->
      <button :disabled="isPending" type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Guardar
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Styles for form labels */
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

/* Styles for form inputs */
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
