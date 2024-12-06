<script src="./ReservationParkingDetailView.ts" lang="ts">
</script>

<template>
  <!-- component -->
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          src="https://bogota.gov.co/sites/default/files/2023-01/parqueadero.jpg">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">PARQUEADERO</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ parkingLotDetail?.name }}</h1>
          <div class="mt-4 space-y-2 mb-3">
            <p class="text-gray-600 text-lg">
              <span class="font-medium">Dirección:</span> {{ parkingLotDetail?.address }}
            </p>
            <p class="text-gray-600 text-lg">
              <span class="font-medium">Teléfono:</span> +57 {{ parkingLotDetail?.phone_number }}
            </p>
          </div>
          <div class="flex mb-4">
            <span class="flex items-center">
              <FontAwesomeIcon :icon="faStar" class="text-blue-700" />
              <FontAwesomeIcon :icon="faStar" class="text-blue-700" />
              <FontAwesomeIcon :icon="faStar" class="text-blue-700" />
              <FontAwesomeIcon :icon="faStar" class="text-blue-700" />
              <FontAwesomeIcon :icon="faStarHalfStroke" class="text-blue-700" />
              <span class="text-gray-600 ml-3">4.5 Reviews</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                  </path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                  </path>
                </svg>
              </a>
            </span>
          </div>

          <form @submit.prevent="onSubmit">

            <!-- Start Date -->
            <div class="mb-4">
              <label for="start_date" class="form-label">Fecha y hora de inicio</label>
              <CustomInput type="datetime-local" v-model="start_date" v-bind="startDateAttrs"
                :error="errors.start_date" />
            </div>

            <!-- End Date -->
            <div class="mb-4">
              <label for="end_date" class="form-label">Fecha y hora de finalización</label>
              <CustomInput type="datetime-local" v-model="end_date" v-bind="endDateAttrs" :error="errors.end_date" />
            </div>

            <!-- Customer Name -->
            <div class="mb-4">
              <label for="customer_name" class="form-label">Su nombre</label>
              <CustomInput type="text" v-model="customer_name" v-bind="customerNameAttrs"
                :error="errors.customer_name" />
            </div>

            <!-- Customer Email -->
            <div class="mb-4">
              <label for="customer_email" class="form-label">Su correo electronico</label>
              <CustomInput type="email" v-model="customer_email" v-bind="customerEmailAttrs"
                :error="errors.customer_email" />
            </div>

            <!-- Customer ID -->
            <div class="mb-4">
              <label for="customer_id" class="form-label">Numero de identificación</label>
              <CustomInput type="text" v-model="customer_id" v-bind="customerIdAttrs" :error="errors.customer_id" />
            </div>

            <div class="mb-4">
              <!-- Fee ID -->
              <label for="fee" class="block mt-2 text-md font-medium text-gray-700">Seleccione el tipo de tarifa</label>
              <select id="fee" v-model="id_fee" v-bind="idFeeAttrs"
                class="mt-1 block shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
                <option disabled="true" value="">Seleccione la tarifa</option>
                <option v-for="fee in parkingLotDetail?.fee" :key="fee.id" :value="fee.id">
                  {{ `${fee.name} - $${fee.cost}` }}
                </option>
              </select>
              <p v-if="errors.id_fee" class="text-red-500 text-sm mt-1">{{ errors.id_fee }}</p>
            </div>

            <div class="mb-4">
              <!-- Payment Method -->
              <label for="payment-method" class="block mt-2 text-md font-medium text-gray-700">Seleccione el método de
                pago</label>
              <select id="payment-method" v-model="id_payment_method" v-bind="idPaymentMethodAttrs"
                class="mt-1 block shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
                <option disabled="true" value="">Seleccione el método de
                  pago</option>
                <option v-for="payment in paymentMethods" :key="payment.id" :value="payment.id">
                  {{ payment.name }}
                </option>
              </select>
              <p v-if="errors.id_payment_method" class="text-red-500 text-sm mt-1">{{ errors.id_payment_method }}</p>
            </div>

            <div class="mb-4">
              <!-- Parking Space -->
              <label for="parking-space" class="block mt-3 text-md font-medium text-gray-700">Espacio de
                Parqueadero</label>
              <select id="parking-space" v-model="id_parking_space" v-bind="idParkingSpaceAttrs"
                class="mt-1 block shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
                <option disabled="true" value="">Seleccione el espacio de parqueo</option>
                <option v-for="space in parkingLotDetail?.parking_space" :key="space.id" :value="space.id">
                  {{ space.space_number }}
                </option>
              </select>
              <p v-if="errors.id_parking_space" class="text-red-500 text-sm mt-1">{{ errors.id_parking_space }}</p>
            </div>
            <div class="flex mt-3">
              <span class="title-font font-medium text-2xl text-gray-900">Total: ${{ totalCost }}</span>
            </div>
            <!-- Submit Button -->
            <button type="submit" :disabled="isPending"
              class="mt-6 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 disabled:opacity-50">
              {{ isPending ? 'Procesando...' : 'Ir a pagar' }}
            </button>
          </form>

        </div>
      </div>
    </div>
  </section>
  <RouterView />
</template>
