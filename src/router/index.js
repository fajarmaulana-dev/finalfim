import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
// import Vue from 'vue'
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done(true);
});

export default router;
