import type { RouteRecordRaw } from 'vue-router'

export const parkingAdminRoutes: RouteRecordRaw = {
  path: '/parking-admin',
  name: 'parking-admin',
  beforeEnter: [],
  component: () =>
    import('@/modules/parkingAdmin/layouts/ParkingAdminLayout.vue'),
  children: [
    {
      path: 'parking-spaces',
      name: 'parking-admin-parkings-spaces',
      component: () =>
        import(
          '@/modules/parkingAdmin/views/parking_spaces/ParkingSpacesView.vue'
        ),
    },
    {
      path: 'parking-spaces/:spaceId',
      name: 'parking-admin-parking-space',
      props: true,
      component: () =>
        import(
          '@/modules/parkingAdmin/views/parking_spaces/ParkingSpaceView.vue'
        ),
    },
    {
      path: 'additional-services',
      name: 'parking-admin-additional-services',
      component: () =>
        import(
          '@/modules/parkingAdmin/views/additional_services/AdditionalServicesView.vue'
        ),
    },
    {
      path: 'additional-services/:serviceId',
      name: 'parking-admin-additional-service',
      props: true,
      component: () =>
        import(
          '@/modules/parkingAdmin/views/additional_services/AdditionalServiceView.vue'
        ),
    },
    {
      path: 'parking/:parkingId',
      name: 'parking-admin-parking',
      props: true,
      component: () =>
        import('@/modules/parkingAdmin/views/parking_lot/ParkingLotView.vue'),
    },
    {
      path: 'fees',
      name: 'parking-admin-fees',
      component: () => import('@/modules/parkingAdmin/views/fees/FeesView.vue'),
    },
    {
      path: 'fees/:feeId',
      name: 'parking-admin-fee',
      props: true,
      component: () => import('@/modules/parkingAdmin/views/fees/FeeView.vue'),
    },
  ],
}
