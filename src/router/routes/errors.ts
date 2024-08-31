export default {
  path: "/:pathMatch(.*)*",
  name: "404",
  component: () => import("@/views/404/index.vue"),
};
