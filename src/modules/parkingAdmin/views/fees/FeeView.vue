<script src="./FeeView.ts" lang="ts"></script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Servicio adicional:
      <small class="text-blue-500">{{ name }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit.prevent="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <div class="mb-4">
        <label for="name" class="form-label">Nombre del servicio</label>
        <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
      </div>
    </div>

    <div class="first-col">
      <div class="mb-4">
        <label for="cost" class="form-label">Costo</label>
        <CustomInput v-model="cost" v-bind="costAttrs" :error="errors.cost" />
      </div>
    </div>

    <!-- Selector for Vehicle Type -->
    <div class="first-col">
      <div class="mb-4">
        <label for="id_vehicle_type" class="form-label">Tipo de vehículo</label>
        <select v-bind="idVehicleTypeAttrs" v-model="id_vehicle_type" class="form-control">
          <option disabled value="">Seleccione el tipo de vehículo</option>
          <option v-for="vehicleType in vehicleTypes" :key="vehicleType.id" :value="vehicleType.id">
            {{ vehicleType.name }}
          </option>
        </select>
        <span v-if="errors.id_vehicle_type">{{ errors.id_vehicle_type }}</span>
      </div>
    </div>

    <!-- Save Button -->
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
