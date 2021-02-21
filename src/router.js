import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/clientes",
      name: "clientes",
      component: () => import("./components/ClienteList")
    },
    {
      path: "/clientes/:id",
      name: "cliente-details",
      component: () => import("./components/Cliente")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCliente")
    }
  ]
});