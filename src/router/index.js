import { createRouter, createWebHistory } from 'vue-router'
import login from "../views/auth/login/index.vue"
import home from "../views/home/index.vue"
import products from "../views/products/index.vue"
import addProduct from "../views/products/add.vue"
import editProduct from "../views/products/edit.vue"
import viewProduct from "../views/products/view.vue"
import NotFound from "../views/not-found.vue"
import TheDefaultLayout from "../views/layout/layout.vue"
import TheCustomLayout from "../views/layout/custom-navbar.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        layout: TheCustomLayout
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        layout: TheDefaultLayout
      }
    },
    {
      path: '/products',
      name: 'products',
      component: products,
      meta: {
        layout: TheDefaultLayout
      }
    },
    {
      path: '/products/add',
      name: 'addProduct',
      component: addProduct,
      meta: {
        layout: TheDefaultLayout
      }
    },
    {
      path: '/products/edit/:id',
      name: 'editProduct',
      component: editProduct,
      meta: {
        layout: TheDefaultLayout
      }
    },
    {
      path: '/products/:id',
      name: 'viewProduct',
      component: viewProduct,
      meta: {
        layout: TheDefaultLayout
      }
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
      meta: {
        layout: TheDefaultLayout
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  const authenticationStatus = JSON.parse(localStorage.getItem('authentication')) || false;

  if (authRequired && (!loggedIn || !authenticationStatus)) {
    next('/');
  } else {
    next();
  }
});



export default router
