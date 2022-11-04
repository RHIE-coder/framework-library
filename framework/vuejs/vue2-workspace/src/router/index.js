import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/video",
    name: "video",
    component: () => import("../views/VideoPlayer.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
