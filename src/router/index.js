import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign/:name',
    name: 'sign',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
  },
  {
    path: '/signup/:type',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/verification',
    name: 'verification',
    component: () => import(/* webpackChunkName: "about" */ '../views/Verification.vue')
  },
  {
    path: '/new-order/:name',
    name: 'new-order',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewOrder.vue')
  },
  {
    path: '/orders/:name',
    name: 'orders',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue')
  },
  {
    path: '/new-group',
    name: 'new-group',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewGroup.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/profile/:name',
    name: 'profile-name',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/order/:id/:type',
    props: true,
    name: 'order',
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },
  {
    path: '/reviews/:id',
    name: 'reviews',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Reviews.vue')
  },
  {
    path: '/client/:type/:client/:offer_id/:id',
    name: 'client',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Client.vue')
  },
  {
    path: '/chats/:id/:client_id',
    name: 'chats',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Chats.vue')
  },
  {
    path: '/group/:id',
    name: 'group',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Groups.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import(/* webpackChunkName: "about" */ '../views/Info.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
