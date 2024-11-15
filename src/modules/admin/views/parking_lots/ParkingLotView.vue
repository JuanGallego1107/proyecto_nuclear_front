<script src="./ParkingLotView.ts" lang="ts"></script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Parqueadero: <small class="text-blue-500">{{ name }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form
    @submit="onSubmit"
    class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5"
  >
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="name" class="form-label">Nombre</label>
        <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
      </div>

      <div class="mb-4">
        <label for="address" class="form-label">Dirección</label>
        <CustomInput
          v-model="address"
          v-bind="addressAttrs"
          :error="errors.address"
        />
      </div>

      <div class="mb-4">
        <label for="phone_number" class="form-label">Teléfono</label>
        <CustomInput
          v-model="phone_number"
          v-bind="phoneNumberAttrs"
          :error="errors.phone_number"
        />
      </div>

      <div class="mb-4">
        <label for="nit" class="form-label">NIT</label>
        <CustomInput v-model="nit" v-bind="nitAttrs" :error="errors.nit" />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="coord_x" class="form-label">Latitud</label>
          <CustomInput
            v-model="coord_x"
            v-bind="coordXAttrs"
            :error="errors.coord_x"
          />
        </div>

        <div class="mb-4">
          <label for="coord_y" class="form-label">Altitud</label>
          <CustomInput
            v-model="coord_y"
            v-bind="coordYAttrs"
            :error="errors.coord_y"
          />
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div
        class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded"
      >
        <div class="flex-shrink-0">
          <img
            src="https://via.placeholder.com/250"
            alt="imagen"
            class="w-[250px] h-[250px]"
          />
        </div>

        <div class="flex-shrink-0">
          <img
            src="https://via.placeholder.com/250"
            alt="imagen"
            class="w-[250px] h-[250px]"
          />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>
        <input multiple type="file" id="image" class="form-control" />
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>

  <div class="grid grid-cls-2 mt-2">
    <div class="bg-blue-200">
      {{ values }}
    </div>
  </div>
</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
