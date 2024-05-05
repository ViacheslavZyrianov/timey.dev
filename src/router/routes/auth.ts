export default {
  path: '/auth',
  name: 'auth',
  meta: {
    name: 'Authorization'
  },
  component: () => import('@/views/Auth/index.vue')
}
