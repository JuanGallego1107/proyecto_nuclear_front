<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <RouterLink to="/">
        <a href="#" class="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/108/127/non_2x/car-parking-icon-vector.jpg"
            alt="QuickParking logo" class="mr-3 h-6 md:h-16 text-blue-500" />
          <span class="self-center whitespace-nowrap text-xl font-semibold">
            Quick Parking
          </span>
        </a>
      </RouterLink>
      <div class="mt-2 sm:mt-0 sm:flex md:order-2">
        <template v-if="authStore.isAuthenticated">
          <!-- Login Button -->
          <RouterLink v-if="authStore.isAdmin" to="/admin">
            <button type="button"
              class="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">
              Admin
            </button>
          </RouterLink>
          <RouterLink v-else to="/parking-admin">
            <button type="button"
              class="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">
              Administrar mi Parqueadero
            </button>
          </RouterLink>
          <button @click="authStore.logout()" type="button"
            class="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
            Cerrar sesión
          </button>
        </template>

        <template v-else>
          <!-- Login Button -->
          <RouterLink :to="{ name: 'login' }" class="">
            <button type="button"
              class="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">
              Iniciar sesión
            </button>
          </RouterLink>
          <RouterLink :to="{ name: 'register' }" class="">
            <button type="button"
              class="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">
              Registrar mi parqueadero
            </button>
          </RouterLink>
        </template>

        <!-- Register Button -->
        <button data-collapse-toggle="navbar-sticky" type="button"
          class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
          <li>
            <a href="#"
              class="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
              aria-current="page">Inicio</a>
          </li>
          <li>
            <a href="#"
              class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">Servicios</a>
          </li>
          <li>
            <a href="#"
              class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">Nosotros</a>
          </li>
          <li>
            <a href="#"
              class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">Contacto</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
