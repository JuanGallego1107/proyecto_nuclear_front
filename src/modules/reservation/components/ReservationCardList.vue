<template>
    <div class="flex flex-wrap justify-center gap-6">
        <div v-for="reservation in reservations" :key="reservation.id"
            class="border rounded-lg shadow-lg p-4 bg-white w-full max-w-md relative">
            <h3 class="text-lg font-bold text-gray-800">Reserva #{{ reservation.reservation_number }}</h3>
            <p class="text-sm text-gray-600">Cliente: {{ reservation.customer_name }}</p>
            <p class="text-sm text-gray-600">Email: {{ reservation.customer_email }}</p>
            <p class="text-sm text-gray-600">Fecha Inicio: {{ formatDate(reservation.start_date) }}</p>
            <p class="text-sm text-gray-600">Fecha Fin: {{ formatDate(reservation.end_date) }}</p>
            <p class="text-sm text-gray-600">Total: ${{ reservation.total }}</p>
            <p class="text-sm text-gray-600">Estado: {{ reservation.reservation_state.name }}</p>
            <p class="text-sm text-gray-600">Espacio: {{ reservation.parking_space.space_number }}</p>
            <p class="text-sm text-gray-600">Tarifa: {{ reservation.fee.name }} ({{ reservation.fee.vehicle_type.name
                }})</p>
            <RouterLink :to="{ name: 'payment-gateway', params: { id: reservation.id } }">
                <button v-if="reservation.reservation_state.name == 'Pendiente'"
                    class="absolute bottom-4 right-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                    @click="$emit('view-details', reservation)">
                    Ir a pagar
                </button>
            </RouterLink>
            <button v-if="false"
                class="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                @click="$emit('view-details', reservation)">
                Cancelar reserva
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { Reservation } from '@/modules/reservations/interfaces/reservation.interface';

defineProps({
    reservations: {
        type: Array as () => Reservation[],
        required: true,
    },
});

defineEmits(['view-details']);

const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(date).toLocaleString('es-ES', options);
};
</script>

<style scoped>
.grid {
    padding: 16px;
}
</style>