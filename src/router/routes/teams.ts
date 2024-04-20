export default {
  path: '/teams',
  children: [
    {
      path: '',
      name: 'teams',
      component: () => import('@/views/Teams/index.vue'),
    },
    {
      path: ':id',
      name: 'team',
      component: () => import('@/views/Teams/Team/index.vue')
    },
    {
      path: 'new',
      name: 'team-new',
      component: () => import('@/views/Teams/New/index.vue')
    }
  ]
}
