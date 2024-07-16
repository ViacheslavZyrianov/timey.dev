import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import routes from "./routes/index";
import checkIsUserLoggedIn from "@/middleware/checkIsUserLoggedIn";
import useAuthStore from "@/store/auth";
import { useTitle } from "@vueuse/core";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const setTitle = (title?: string) => {
  useTitle(title || "Timey");
};

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    setTitle(to.meta.name as string);
    checkIsUserLoggedIn((isUserLoggedIn: boolean) => {
      const authStore = useAuthStore();
      authStore.isUserLoggedIn = isUserLoggedIn;
      if (!isUserLoggedIn && to.name !== "auth") next("auth");
      else if (isUserLoggedIn && to.name === "auth") next("dashboard");
      else next();
    });
  },
);

export default router;
