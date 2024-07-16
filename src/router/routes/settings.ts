export default {
  path: "/settings",
  meta: {
    name: "Settings",
  },
  children: [
    {
      path: "",
      name: "settings",
      component: () => import("@/views/Settings/index.vue"),
    },
  ],
};
