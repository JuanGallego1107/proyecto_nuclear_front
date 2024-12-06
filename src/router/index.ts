import { adminRoutes } from '@/modules/admin/routes'
import { authRoutes } from '@/modules/auth/routes'
import { parkingAdminRoutes } from '@/modules/parkingAdmin/routes'
import ReservationLayout from '@/modules/reservation/layouts/ReservationLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Create the router instance
const router = createRouter({
  // Set up the router history (web history mode)
  history: createWebHistory(import.meta.env.BASE_URL),

  // Define the route configuration
  routes: [
    // Main reservation route with a layout component
    {
      path: '/',
      name: 'reservation',
      component: ReservationLayout,
      children: [
        // Home view under the reservation layout
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/reservation/views/HomeView.vue'),
        },
        // Route for reservation detail view
        {
          path: 'reservation-detail/:parkingId',
          name: 'reservation-detail',
          props: true,
          component: () =>
            import(
              '@/modules/reservation/views/ReservationParkingDetailView.vue'
            ),
        },
        // Route for payment_gateway
        {
          path: 'payment-gateway/:id?',
          name: 'payment-gateway',
          props: true,
          component: () =>
            import('@/modules/reservation/views/PaymentGatewayView.vue'),
        },
      ],
    },
    // Add authentication-related routes
    authRoutes,

    // Add admin-related routes
    adminRoutes,

    // Add parking admin-related routes
    parkingAdminRoutes,
  ],
})

export default router
