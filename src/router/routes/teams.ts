export default {
  path: "/teams",
  children: [
    {
      path: "",
      name: "teams",
      meta: {
        name: "Teams",
      },
      component: () => import("@/views/Teams/index.vue"),
    },
    {
      path: "/teams/:team_id",
      name: "team",
      component: () => import("@/views/Teams/Team/index.vue"),
    },
    {
      path: "/teams/:team_id/members/:member_id",
      name: "team-member",
      component: () => import("@/views/Teams/Team/Members/index.vue"),
    },
  ],
};
