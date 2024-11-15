<template>
  <h1 class="text-2xl font-semibold mb-4">Iniciar sesión</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo electrónico</label>
      <input
        v-model="myForm.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        v-model="myForm.rememberMe"
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2">Recuerdame</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidaste tu constraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Iniciar sesión
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">
      Registrar mi parqueadero</RouterLink
    >
  </div>
</template>

<script lang="ts" setup>
// Import necessary modules and libraries
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'

// Initialize router, auth store, and toast notifications
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// References to input fields for email and password
const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)

// Reactive object for form data
const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

// Login function to authenticate the user
const onLogin = async () => {
  // Validate email field
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }

  // Validate password field (min length of 6)
  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus()
  }

  // Handle remember me functionality (save email to localStorage)
  if (myForm.rememberMe) {
    localStorage.setItem('email', myForm.email)
  } else {
    localStorage.removeItem('email')
  }

  // Attempt to log in using the auth store
  const ok = await authStore.login(myForm.email, myForm.password)

  // If login is unsuccessful, show error message
  if (ok) return
  toast.error('Usuario/Contraseña no son correctos')
}

// Watch for changes to localStorage and pre-fill form if needed
watchEffect(() => {
  const email = localStorage.getItem('email')
  if (email) {
    myForm.email = email
    myForm.rememberMe = true
  }
})
</script>
