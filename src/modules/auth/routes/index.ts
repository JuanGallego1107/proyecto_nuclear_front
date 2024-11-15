import type { RouteRecordRaw } from 'vue-router'
import isNotAuthenticatedGuard from '../guards/is-not-authenticated.guard'

// Authentication routes
export const authRoutes: RouteRecordRaw = {
  // Parent path router
  path: '/auth',
  name: 'auth',
  // Not authenticated guard
  beforeEnter: [isNotAuthenticatedGuard],
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/views/RegisterParkingView.vue'),
    },
  ],
}
