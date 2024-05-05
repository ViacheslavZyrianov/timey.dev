export default {
  path: '/profile',
  name: 'profile',
  meta: {
    name: 'Profile'
  },
  component: () => import('@/views/Profile/index.vue')
}
