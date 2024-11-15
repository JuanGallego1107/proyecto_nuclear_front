<script setup lang="ts">
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Define props for pagination
interface Props {
  page: number
  isFirstPage: boolean
  hasMoreData: boolean
}

// Bind the props to the component
defineProps<Props>()
</script>

<template>
  <!-- Pagination buttons container -->
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <!-- Previous page button -->
    <button
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <FontAwesomeIcon :icon="faArrowLeft" />
      <!-- Left arrow icon -->
      <span>Anterior</span>
      <!-- Button label -->
    </button>

    <!-- Next page button -->
    <button
      :disabled="!hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
    >
      <span>Siguiente</span>
      <!-- Button label -->
      <FontAwesomeIcon :icon="faArrowRight" />
      <!-- Right arrow icon -->
    </button>
  </div>
</template>
