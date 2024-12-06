<script src="./ParkingSpaceView.ts" lang="ts"></script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Espacio de parqueadero:
      <small class="text-blue-500">{{ space_number }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="name" class="form-label">Numero de espacio</label>
        <CustomInput v-model="space_number" v-bind="spaceNumberAttrs" :error="errors.space_number" />
      </div>
    </div>

    <!-- Botón para guardar -->
    <div class="my-4 text-right">
      <button :disabled="isPending" type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Guardar
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
