import auth from "./auth";
import profile from "./profile";
import timeTracking from "./timeTracking";
import dashboard from "./dashboard";
import teams from "./teams";
import settings from "./settings";
import errors from "./errors";

export default [
  {
    path: "/",
    redirect: "/dashboard",
  },
  profile,
  timeTracking,
  auth,
  dashboard,
  teams,
  settings,
  errors,
  {
    name: "Components",
    path: "/components",
    component: () => import("@/views/Components/index.vue"),
  },
];
