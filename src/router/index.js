import { createRouter, createWebHistory } from "vue-router";
import AddWork from "../views/AddWork.vue";

const routes = [
  {
    path: "/",
    name: "AddWork",
    component: AddWork,
  },
  {
    path: "/listofWork",
    name: "ListWork",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ListOfWorks" */ "../views/ListWork.vue"),
  },
  {
    path: "/editWork/:id",
    name: "EditWork",
    component: () =>
      import(/* webpackChunkName: "EditWork" */ "../views/EditWork.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

export default router;
