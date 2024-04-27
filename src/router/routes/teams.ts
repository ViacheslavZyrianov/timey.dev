export default {
  path: '/teams',
  children: [
    {
      path: '',
      name: 'teams',
      component: () => import('@/views/Teams/index.vue'),
    },
    {
      path: ':team_id',
      name: 'team',
      component: () => import('@/views/Teams/Team/index.vue'),
    },
    {
      path: ':team_id/members/:member_id',
      name: 'team-member',
      component: () => import('@/views/Teams/Team/Members/index.vue'),
    },
    {
      path: 'new',
      name: 'team-new',
      component: () => import('@/views/Teams/New/index.vue')
    }
  ]
}
