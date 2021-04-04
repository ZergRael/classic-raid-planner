import { createRouter, createWebHistory } from "vue-router";
import RaidPlanner from "@/views/RaidPlanner.vue";
import SessionSelector from "@/views/SessionSelector.vue";

const routes = [
  {
    path: "/",
    name: "SessionSelector",
    component: SessionSelector,
  },
  {
    path: "/:id",
    name: "RaidPlanner",
    component: RaidPlanner,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
