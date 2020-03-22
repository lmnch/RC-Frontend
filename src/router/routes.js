const routes = [
  {
    path: "/",
    component: () => import("layouts/StartLayout.vue"),
    children: [{ path: "", component: () => import("pages/Start.vue") }]
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Main.vue") }]
  },
  {
    path: "/map",
    component: () => import("layouts/PremiumLayout.vue"),
    children: [{ path: "", component: () => import("pages/MapOverview.vue") }]
  },
  {
    path: "/options",
    component: () => import("layouts/PremiumLayout.vue"),
    children: [{ path: "", component: () => import("pages/Options.vue") }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
