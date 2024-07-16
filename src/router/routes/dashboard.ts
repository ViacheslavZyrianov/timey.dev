export default {
  path: "/dashboard",
  name: "dashboard",
  meta: {
    name: "Dashboard",
  },
  component: () => import("@/views/Dashboard/index.vue"),
};
