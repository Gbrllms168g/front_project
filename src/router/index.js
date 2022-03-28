import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersList.vue'),
  },
  {
    path: '/user/:id',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
