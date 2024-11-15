import { adminRoutes } from '@/modules/admin/routes'
import { authRoutes } from '@/modules/auth/routes'
import ParkingLotDetailView from '@/modules/parking_lots/views/ParkingLotDetailView.vue'
import { parkingAdminRoutes } from '@/modules/parkingAdmin/routes'
import ReservationLayout from '@/modules/reservation/layouts/ReservationLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'reservation',
      component: ReservationLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/reservation/views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/reservation-detail',
      name: 'reservation-detail',
      component: ParkingLotDetailView,
    },
    authRoutes,
    adminRoutes,
    parkingAdminRoutes,
  ],
})

export default router
