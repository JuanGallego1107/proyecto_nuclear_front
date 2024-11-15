<template>
  <!-- Contenedor para el mapa con altura y anchura definidas -->
  <div class="map-container" style="height: 400px; width: 100%">
    <!-- Componente de mapa de Vue-Leaflet -->
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="[4.533816, -75.674637]"
      class="w-full h-full"
    >
      <!-- Capa base del mapa con OpenStreetMap -->
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <!-- Marcadores de los parqueaderos -->
      <l-marker
        :lat-lng="[4.532727712676052, -75.67466295448202]"
        @click="navigate"
      >
        <l-tooltip> Parqueadero El Comercio </l-tooltip>
        <!-- Tooltip que aparece al pasar el mouse -->
      </l-marker>

      <l-marker
        :lat-lng="[4.5355481973136245, -75.66951697511475]"
        @click="navigate"
      >
        <l-tooltip> Parqueadero La 13 </l-tooltip>
      </l-marker>

      <l-marker
        :lat-lng="[4.534393503591804, -75.67563138602345]"
        @click="navigate"
      >
        <l-tooltip> Parqueadero Piel Roja </l-tooltip>
      </l-marker>

      <l-marker
        :lat-lng="[4.537933296533372, -75.66915618689343]"
        @click="navigate"
      >
        <l-tooltip> Parqueadero La 11 </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LTileLayer, LTooltip } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import { useRouter } from 'vue-router'

export default {
  components: {
    LMap, // Componente para el mapa
    LTileLayer, // Componente para la capa del mapa -->
    LMarker, // Componente para los marcadores -->
    LTooltip, // Componente para el tooltip -->
  },
  data() {
    return {
      zoom: 15,
    }
  },
  setup() {
    // Instancia del router para la navegación
    const router = useRouter()

    // Función para navegar a la página de detalles de la reserva
    const navigate = () => {
      router.push('/reservation-detail')
    }

    return { navigate: navigate }
  },
  mounted() {
    //console.log(L) <!-- Verifica si Leaflet está correctamente importado y disponible -->
  },
}
</script>

<style scoped>
/* Estilos para el contenedor del mapa */
.map-container {
  width: 100%;
  height: 400px; /* Ajusta la altura del contenedor del mapa */
}

/* Estilos para asegurarse de que el mapa ocupa todo el contenedor */
.l-map {
  width: 100%;
  height: 100%; /* Asegura que el mapa ocupe toda la altura disponible */
}
</style>
