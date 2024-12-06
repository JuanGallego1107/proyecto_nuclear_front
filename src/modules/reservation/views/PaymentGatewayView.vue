<!-- component -->
<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
</style>
<style>
/*
module.exports = {
    plugins: [require('@tailwindcss/forms'),]
};
*/
.form-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
    border-radius: 100%;
    border-width: 2px;
}

.form-radio:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

@media not print {
    .form-radio::-ms-check {
        border-width: 1px;
        color: transparent;
        background: inherit;
        border-color: inherit;
        border-radius: inherit;
    }
}

.form-radio:focus {
    outline: none;
}

.form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    background-repeat: no-repeat;
    padding-top: 0.5rem;
    padding-right: 2.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
}

.form-select::-ms-expand {
    color: #a0aec0;
    border: none;
}

@media not print {
    .form-select::-ms-expand {
        display: none;
    }
}

@media print and (-ms-high-contrast: active),
print and (-ms-high-contrast: none) {
    .form-select {
        padding-right: 0.75rem;
    }
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { updateReservationState } from '@/modules/reservations/actions/update-reservation-state.action';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const route = useRoute();

// Definir el esquema de validación con Yup
const validationSchema = yup.object({
    cardName: yup
        .string()
        .required('El nombre en la tarjeta es obligatorio')
        .matches(/^[A-Za-z\s]+$/, 'Solo se permiten letras'),

    cardNumber: yup
        .string()
        .required('El número de tarjeta es obligatorio')
        .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Formato de tarjeta inválido (0000 0000 0000 0000)'),

    expiryMonth: yup
        .string()
        .required('Mes de expiración es obligatorio'),

    expiryYear: yup
        .string()
        .required('Año de expiración es obligatorio'),

    cvc: yup
        .string()
        .required('CVC es obligatorio')
        .matches(/^\d{3}$/, 'CVC debe ser de 3 dígitos')
})

// Usar vee-validate para manejar el formulario
const { handleSubmit, errors, meta } = useForm({
    validationSchema,
    initialValues: {
        cardName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: ''
    }
})

// Crear campos individuales para un control más preciso
const { value: cardName, errorMessage: cardNameError } = useField('cardName')
const { value: cardNumber, errorMessage: cardNumberError } = useField('cardNumber')
const { value: expiryMonth, errorMessage: expiryMonthError } = useField('expiryMonth')
const { value: expiryYear, errorMessage: expiryYearError } = useField('expiryYear')
const { value: cvc, errorMessage: cvcError } = useField('cvc')

// Método de submit
const onSubmit = handleSubmit((values) => {
    // Simulación de procesamiento de pago
    console.log('Datos de pago:', values)

    updateReservationState(4, route.params.id).then(() => {
        toast.success('Pago procesado exitosamente')
        router.replace('/')
    });
})
</script>

<template>
    <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-32">
        <form @submit.prevent="onSubmit" class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
            style="max-width: 600px">
            <!-- Ícono de tarjeta -->
            <div class="w-full pt-1 pb-5">
                <div
                    class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                    <i class="mdi mdi-credit-card-outline text-3xl"></i>
                </div>
            </div>

            <div class="mb-10">
                <h1 class="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </div>

            <!-- Nombre en la tarjeta -->
            <div class="mb-3">
                <label class="font-bold text-sm mb-2 ml-1">Nombre que aparece en la tarjeta</label>
                <input v-model="cardName"
                    class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="John Smith" type="text" />
                <span v-if="cardNameError" class="text-red-500 text-sm">{{ cardNameError }}</span>
            </div>

            <!-- Número de tarjeta -->
            <div class="mb-3">
                <label class="font-bold text-sm mb-2 ml-1">Numero de la tarjeta</label>
                <input v-model="cardNumber"
                    class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="0000 0000 0000 0000" type="text" />
                <span v-if="cardNumberError" class="text-red-500 text-sm">{{ cardNumberError }}</span>
            </div>

            <!-- Fecha de expiración -->
            <div class="mb-3 -mx-2 flex items-end">
                <div class="px-2 w-1/2">
                    <label class="font-bold text-sm mb-2 ml-1">Fecha de vencimiento</label>
                    <select v-model="expiryMonth"
                        class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                        <option value="">Seleccionar mes</option>
                        <option value="01">01 - Enero</option>
                        <option value="02">02 - Febrero</option>
                        <option value="03">03 - Marzo</option>
                        <option value="04">04 - Abril</option>
                        <option value="05">05 - Mayo</option>
                        <option value="06">06 - Junio</option>
                        <option value="07">07 - Julio</option>
                        <option value="08">08 - Agosto</option>
                        <option value="09">09 - Septiembre</option>
                        <option value="10">10 - Octubre</option>
                        <option value="11">11 - Noviembre</option>
                        <option value="12">12 - Diciembre</option>
                    </select>
                    <span v-if="expiryMonthError" class="text-red-500 text-sm">{{ expiryMonthError }}</span>
                </div>
                <div class="px-2 w-1/2">
                    <select v-model="expiryYear"
                        class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                        <option value="">Seleccionar año</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                    </select>
                    <span v-if="expiryYearError" class="text-red-500 text-sm">{{ expiryYearError }}</span>
                </div>
            </div>

            <!-- CVC -->
            <div class="mb-10">
                <label class="font-bold text-sm mb-2 ml-1">Codigo de seguridad (CVC)</label>
                <input v-model="cvc"
                    class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="000" type="text" />
                <span v-if="cvcError" class="text-red-500 text-sm">{{ errors.cvc }}</span>
            </div>

            <!-- Botón de pago -->
            <div>
                <button type="submit"
                    class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    <i class="mdi mdi-lock-outline mr-1"></i> Pagar ahora
                </button>
            </div>
        </form>
    </div>
</template>