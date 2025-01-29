import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/ForgotPassword.vue')
      }
    ]
  },
  {
    path: '/organization',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'MyOrganization',
        component: () => import('@/views/MyOrganization.vue')
      },
      {
        path: 'best-performers',
        name: 'BestPerformers',
        component: () => import('@/views/BestPerformers.vue')
      }
    ]
  },
  {
    path: '/membership',
    name: 'MembershipPlan',
    component: () => import('@/views/MembershipPlan.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router