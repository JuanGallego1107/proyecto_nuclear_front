import isAdminGuard from '@/modules/auth/guards/is-admin.guard'
import type { RouteRecordRaw } from 'vue-router'

// Admin routes configuration for the application
export const adminRoutes: RouteRecordRaw = {
  path: '/admin', // Root path for admin section
  name: 'admin',
  beforeEnter: [],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'), // Admin layout component
  children: [
    {
      path: 'dashboard', // Admin dashboard route
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'parkings', // Route for parking lots overview
      name: 'admin-parkings',
      component: () =>
        import('@/modules/admin/views/parking_lots/ParkingLotsView.vue'),
    },
    {
      path: 'parkings/:parkingId', // Detailed view for a specific parking lot
      name: 'admin-parking',
      props: true, // Pass route parameters as props to the component
      component: () =>
        import('@/modules/admin/views/parking_lots/ParkingLotView.vue'),
    },
    {
      path: 'payment-methods', // Route for managing payment methods
      name: 'admin-payment-methods',
      component: () =>
        import('@/modules/admin/views/payment_methods/PaymentMethodsView.vue'),
    },
    {
      path: 'payment-methods/:paymentId', // Detailed view for a specific payment method
      name: 'admin-payment-method',
      props: true,
      component: () =>
        import('@/modules/admin/views/payment_methods/PaymentMethodView.vue'),
    },
    {
      path: 'reservation-states', // Route for managing reservation states
      name: 'admin-reservation-states',
      component: () =>
        import(
          '@/modules/admin/views/reservation_states/ReservationStatesView.vue'
        ),
    },
    {
      path: 'reservation-states/:stateId', // Detailed view for a specific reservation state
      name: 'admin-reservation-state',
      props: true,
      component: () =>
        import(
          '@/modules/admin/views/reservation_states/ReservationStateView.vue'
        ),
    },
    {
      path: 'users', // Route for managing users
      name: 'admin-users',
      component: () => import('@/modules/admin/views/users/UsersView.vue'),
    },
  ],
}
