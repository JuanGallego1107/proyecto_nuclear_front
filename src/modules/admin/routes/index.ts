import isAdminGuard from '@/modules/auth/guards/is-admin.guard'
import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'parkings',
      name: 'admin-parkings',
      component: () =>
        import('@/modules/admin/views/parking_lots/ParkingLotsView.vue'),
    },
    {
      path: 'parkings/:parkingId',
      name: 'admin-parking',
      props: true,
      component: () =>
        import('@/modules/admin/views/parking_lots/ParkingLotView.vue'),
    },
    {
      path: 'payment-methods',
      name: 'admin-payment-methods',
      component: () =>
        import('@/modules/admin/views/payment_methods/PaymentMethodsView.vue'),
    },
    {
      path: 'payment-methods/:paymentId',
      name: 'admin-payment-method',
      props: true,
      component: () =>
        import('@/modules/admin/views/payment_methods/PaymentMethodView.vue'),
    },
    {
      path: 'reservation-states',
      name: 'admin-reservation-states',
      component: () =>
        import(
          '@/modules/admin/views/reservation_states/ReservationStatesView.vue'
        ),
    },
    {
      path: 'reservation-states/:stateId',
      name: 'admin-reservation-state',
      props: true,
      component: () =>
        import(
          '@/modules/admin/views/reservation_states/ReservationStateView.vue'
        ),
    },
    {
      path: 'users',
      name: 'admin-users',
      component: () => import('@/modules/admin/views/users/UsersView.vue'),
    },
  ],
}
