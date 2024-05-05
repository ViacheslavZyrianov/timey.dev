export default {
  path: '/time-tracking',
  name: 'timeTracking',
  redirect: () => {
    return {
      name: 'timeTrackingYearMonth',
      params: {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
      }
    }
  },
  children: [
    {
      path: ':year/:month',
      name: 'timeTrackingYearMonth',
      component: () => import('@/views/TimeTracking/index.vue')
    }
  ]
}
