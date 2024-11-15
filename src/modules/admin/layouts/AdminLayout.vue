<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import {
  faBars,
  faCalendarCheck,
  faCar,
  faCreditCard,
  faTachometerAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const authStore = useAuthStore()

// Reactive var to handle sideBar status
const isSidebarOpen = ref(true)

// Change sidebar status
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex w-screen h-screen text-gray-700">
    <!-- Sidebar Start -->
    <div
      :class="`flex flex-col ${isSidebarOpen ? 'w-56' : 'w-20'} border-r border-gray-300 transition-width duration-300`"
    >
      <!-- Toggle Button -->
      <button
        @click="toggleSidebar"
        class="flex items-center justify-center w-full h-10 bg-white text-gray-700 hover:bg-gray-200"
      >
        <FontAwesomeIcon :icon="isSidebarOpen ? faBars : faBars" />
      </button>

      <!-- Sidebar Logo -->
      <a
        class="flex items-center justify-center flex-shrink-0 w-full h-32 bg-gray-500"
        href="#"
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/108/127/non_2x/car-parking-icon-vector.jpg"
          alt="Placeholder Image"
          :class="`object-cover bg-white ${isSidebarOpen ? 'w-full h-full' : 'w-16 h-16'}`"
        />
      </a>

      <!-- Sidebar Links -->
      <div class="flex flex-col flex-grow p-4 overflow-auto">
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/dashboard"
        >
          <FontAwesomeIcon :icon="faTachometerAlt" class="mr-2 text-blue-500" />
          <span v-if="isSidebarOpen" class="leading-none">Dashboard</span>
        </RouterLink>
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/parkings"
        >
          <FontAwesomeIcon :icon="faCar" class="mr-2 text-blue-500" />
          <span v-if="isSidebarOpen" class="leading-none">Parqueaderos</span>
        </RouterLink>
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/users"
        >
          <FontAwesomeIcon :icon="faUsers" class="mr-2 text-blue-500" />
          <span v-if="isSidebarOpen" class="leading-none">Usuarios</span>
        </RouterLink>
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/payment-methods"
        >
          <FontAwesomeIcon :icon="faCreditCard" class="mr-2 text-blue-500" />
          <span v-if="isSidebarOpen" class="leading-none">Métodos de pago</span>
        </RouterLink>
        <RouterLink
          class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
          to="/admin/reservation-states"
        >
          <FontAwesomeIcon :icon="faCalendarCheck" class="mr-2 text-blue-500" />
          <span v-if="isSidebarOpen" class="leading-none"
            >Estádos de reserva</span
          >
        </RouterLink>
      </div>
    </div>
    <!-- Sidebar End -->

    <!-- Main Content Start -->
    <div class="flex flex-col flex-grow">
      <div
        class="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300"
      >
        <h1 class="text-lg font-medium">
          {{ `Bienvenido: ${authStore.user?.name ?? 'Administrador'}` }}
        </h1>
      </div>
      <div class="flex-grow p-6 overflow-auto bg-gray-200">
        <RouterView />
      </div>
    </div>
    <!-- Main Content End -->
  </div>

  <!-- Twitter Link (fixed) -->
  <a
    class="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-blue-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 hover:bg-blue-600"
    href="https://twitter.com/lofiui"
    target="_top"
  >
    <div
      class="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full"
    >
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <g>
          <path
            d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
          ></path>
        </g>
      </svg>
    </div>
    <span class="text-sm ml-1 leading-none">@lofiui</span>
  </a>
</template>

<style scoped>
/* Custom style for sidebar transition */
.transition-width {
  transition: width 0.3s;
}
</style>
