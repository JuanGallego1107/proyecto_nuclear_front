import type { RouteRecordRaw } from 'vue-router'

// Define parkingAdminRoutes as RouteRecordRaw to manage parking-related views
export const parkingAdminRoutes: RouteRecordRaw = {
  path: '/parking-admin', // Main route path for parking admin
  name: 'parking-admin', // Name of the route
  beforeEnter: [], // Route guards can be added here if needed
  component: () =>
    import('@/modules/parkingAdmin/layouts/ParkingAdminLayout.vue'), // Main layout for the parking admin
  children: [
    {
      path: 'parking-spaces', // Route for viewing parking spaces
      name: 'parking-admin-parkings-spaces', // Route name
      component: () =>
        import(
          '@/modules/parkingAdmin/views/parking_spaces/ParkingSpacesView.vue'
        ), // Component for parking spaces list view
    },
    {
      path: 'parking-spaces/:spaceId', // Dynamic route for viewing a specific parking space
      name: 'parking-admin-parking-space', // Route name
      props: true, // Pass route params as props to the component
      component: () =>
        import(
          '@/modules/parkingAdmin/views/parking_spaces/ParkingSpaceView.vue'
        ), // Component for a single parking space view
    },
    {
      path: 'additional-services', // Route for viewing additional services
      name: 'parking-admin-additional-services', // Route name
      component: () =>
        import(
          '@/modules/parkingAdmin/views/additional_services/AdditionalServicesView.vue'
        ), // Component for additional services list view
    },
    {
      path: 'additional-services/:serviceId', // Dynamic route for viewing a specific service
      name: 'parking-admin-additional-service', // Route name
      props: true, // Pass route params as props to the component
      component: () =>
        import(
          '@/modules/parkingAdmin/views/additional_services/AdditionalServiceView.vue'
        ), // Component for a single additional service view
    },
    {
      path: 'parking/:parkingId', // Dynamic route for viewing a specific parking lot
      name: 'parking-admin-parking', // Route name
      props: true, // Pass route params as props to the component
      component: () =>
        import('@/modules/parkingAdmin/views/parking_lot/ParkingLotView.vue'), // Component for a single parking lot view
    },
    {
      path: 'fees', // Route for viewing fees
      name: 'parking-admin-fees', // Route name
      component: () => import('@/modules/parkingAdmin/views/fees/FeesView.vue'), // Component for fees list view
    },
    {
      path: 'fees/:feeId', // Dynamic route for viewing a specific fee
      name: 'parking-admin-fee', // Route name
      props: true, // Pass route params as props to the component
      component: () => import('@/modules/parkingAdmin/views/fees/FeeView.vue'), // Component for a single fee view
    },
    {
      path: 'schedules', // Route for viewing schedules
      name: 'parking-admin-schedules', // Route name
      component: () =>
        import('@/modules/parkingAdmin/views/schedules/Schedules.vue'), // Component for schedules list view
    },
  ],
}
