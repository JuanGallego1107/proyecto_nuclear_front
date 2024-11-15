<template>
  <div class="map-container" style="height: 400px; width: 100%">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="[4.533816, -75.674637]"
      class="w-full h-full"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <!-- Marcadores de parqueaderos-->
      <l-marker
        :lat-lng="[4.532727712676052, -75.67466295448202]"
        @click="navigate"
      >
        <l-tooltip> Parqueadero El Comercio </l-tooltip>
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
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import { LMap, LMarker, LTileLayer, LTooltip } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet' // Importing Leaflet itself
import { useRouter } from 'vue-router'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      zoom: 15,
    }
  },
  setup() {
    const router = useRouter()

    // Function to navigate to the admin page when marker is clicked
    const navigate = () => {
      router.push('/reservation-detail')
    }

    return { navigate: navigate }
  },
  mounted() {
    console.log(L) // Check if Leaflet is available
  },
}
</script>

<style scoped>
.map-container {
  /* Ajusta el tamaño del contenedor según sea necesario */
  width: 100%;
  height: 400px; /* Ajusta la altura a tu preferencia */
}

.l-map {
  width: 100%;
  height: 100%; /* Asegura que el mapa llene el contenedor */
}
</style>
