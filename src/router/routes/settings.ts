export default {
  path: '/settings',
  children: [
    {
      path: '',
      name: 'settings',
      component: () => import('@/views/Settings/index.vue'),
    },
  ]
}
