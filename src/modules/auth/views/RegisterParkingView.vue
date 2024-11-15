<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'

const router = useRouter()

const authStore = useAuthStore()
const toast = useToast()

const nameInputRef = ref<HTMLInputElement | null>(null)
const addressInputRef = ref<HTMLInputElement | null>(null)
const phoneNumberInputRef = ref<HTMLInputElement | null>(null)
const nitInputRef = ref<HTMLInputElement | null>(null)
const latInputRef = ref<HTMLInputElement | null>(null)
const lngInputRef = ref<HTMLInputElement | null>(null)

const myForm = reactive({
  name: '',
  address: '',
  phoneNumber: '',
  nit: '',
  lat: '',
  lng: '',
})

const onRegisterParking = async () => {
  if (myForm.name === '') {
    return nameInputRef.value?.focus()
  }

  if (myForm.address === '') {
    return addressInputRef.value?.focus()
  }

  if (myForm.phoneNumber === '') {
    return phoneNumberInputRef.value?.focus()
  }

  if (myForm.nit === '') {
    return nitInputRef.value?.focus()
  }

  if (myForm.lat === '') {
    return latInputRef.value?.focus()
  }

  if (myForm.lng === '') {
    return lngInputRef.value?.focus()
  }

  const ok = await authStore.registerParking(
    myForm.name,
    myForm.address,
    myForm.phoneNumber,
    myForm.nit,
    myForm.lat,
    myForm.lng,
  )

  if (ok) return

  toast.error('Registro de parqueadero fallido')
}
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registra tu parqueadero</h1>
  <form @submit.prevent="onRegisterParking">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input
        v-model="myForm.name"
        ref="nameInputRef"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Address Input -->
    <div class="mb-4">
      <label for="address" class="block text-gray-600">Dirección</label>
      <input
        v-model="myForm.address"
        ref="addressInputRef"
        type="text"
        id="address"
        name="address"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- PhoneNumber Input -->
    <div class="mb-4">
      <label for="phone" class="block text-gray-600">Teléfono</label>
      <input
        v-model="myForm.phoneNumber"
        ref="phoneNumberInputRef"
        type="phone"
        id="phone"
        name="phone"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- NIT Input -->
    <div class="mb-4">
      <label for="nit" class="block text-gray-600">NIT</label>
      <input
        v-model="myForm.nit"
        ref="nitInputRef"
        type="text"
        id="nit"
        name="nit"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- LAT Input -->
    <div class="mb-4">
      <label for="lat" class="block text-gray-600">Latitud</label>
      <input
        v-model="myForm.lat"
        ref="latInputRef"
        type="text"
        id="lat"
        name="lat"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- LNG Input -->
    <div class="mb-4">
      <label for="lng" class="block text-gray-600">Longitud</label>
      <input
        v-model="myForm.lng"
        ref="lngInputRef"
        type="text"
        id="lng"
        name="lng"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Registrar
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline"
      >Ya tienes un parqueadero registrado? Inica sesión aquí</RouterLink
    >
  </div>
</template>
