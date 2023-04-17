import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'login' } 
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/login/change/1',
    name: 'login-change-1',
    meta: {layout: 'auth'},
    component: () => import('../views/Login/ChangePassword1.vue')
  },
  {
    path: '/login/change/2',
    name: 'login-change-2',
    meta: {layout: 'auth'},
    component: () => import('../views/Login/ChangePassword2.vue')
  },
  {
    path: '/login/change/after',
    name: 'login-change-after',
    meta: {layout: 'auth'},
    component: () => import('../views/Login/ChangePasswordAfter.vue')
  },
  {
    path: '/registration/1',
    name: 'registration-1',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration/Registration1.vue')
  },
  {
    path: '/registration/2',
    name: 'registration-2',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration/Registration2.vue')
  },
  {
    path: '/registration/3',
    name: 'registration-3',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration/Registration3.vue')
  },
  {
    path: '/registration/after',
    name: 'registration-after',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration/RegistrationAfter.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('../views/Main.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    meta: {layout: 'main'},
    component: () => import('../views/Invoices.vue')
  },
  {
    path: '/invoices/add',
    name: 'invoices-add',
    meta: {layout: 'main'},
    component: () => import('../views/AddInvoice.vue')
  },
  {
    path: '/invoices/view/:id',
    name: 'invoices-view',
    params: true,
    meta: {layout: 'main'},
    component: () => import('../views/ViewInvoice.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {layout: 'main'},
    component: () => import('../views/Goods.vue')
  },
  {
    path: '/requests',
    name: 'requests',
    meta: {layout: 'main'},
    component: () => import('../views/Request/Requests.vue')
  },
  {
    path: '/requests/view/:id',
    name: 'requests-view',
    params: true,
    meta: {layout: 'main'},
    component: () => import('../views/Request/RequestView.vue')
  },
  {
    path: '/request/1',
    name: 'request-1',
    meta: {layout: 'main'},
    component: () => import('../views/Request/SendRequest1.vue')
  },
  {
    path: '/request/2',
    name: 'request-2',
    meta: {layout: 'main'},
    component: () => import('../views/Request/SendRequest2.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
