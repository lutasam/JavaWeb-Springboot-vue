import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [{
    path: '/',
    redirect: "/home",
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import("@/views/Home")
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import("@/views/Login")
  },

  {
    path: '/Register',
    name: 'Register',
    component: () => import("@/views/Register")
  },

  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: "/layout/user",
    children: [{
        path: 'User',
        name: 'User',
        component: () => import("@/views/User")
      },
      {
        path: 'Good',
        name: 'Good',
        component: () => import("@/views/Good")
      },
      {
        path: 'Exchange',
        name: 'Exchange',
        component: () => import("@/views/Exchange")
      },
    ]
  },
  {
    path: '/Person',
    name: 'Person',
    component: () => import("@/views/Person")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router