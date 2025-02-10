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
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: 'my-organization',
        name: 'MyOrganization',
        component: () => import('@/views/MyOrganization.vue'),
        children: [
          {
            path: 'settings',
            name: 'OrganizationSettings',
            component: () => import('@/views/OrganizationSettings.vue')
          }]
      },
      {
        path:'profile',
        name: 'Profile',
        component: () => import('@/views/MembershipPlan.vue'),
        children: [
          {
            path: 'password/edit',
            name: 'PasswordEdit',
            component: () => import('@/views/ChangePassword.vue')
          },
          {
            path: 'industry',
            name: 'Industry',
            component: () => import('@/views/MembershipPlan.vue')
          }
        ]
      },
      {
        path: '',
        name: 'BestPerformers',
        component: () => import('@/views/BestPerformers.vue')
      },
      {
        path:'management/organization',
        name:'DataManageOrganization',
        component: () => import('@/views/DataManage.vue'),
        children: [
          {
            path: 'edit/:id',
            name: 'OrganizationEdit',
            component: () => import('@/views/OrganizationEdit.vue')
          },
        ]
      },
      {
        path: '/management/organization/:id',
        name:'DataManageOrganizationDetail',
        component: () => import('@/views/DataManageDetail.vue')
      },
      {
        path:'management/industry',
        name:'DataImport',
        component: () => import('@/views/DataManage.vue')
      },
      {
        path:'management/channel',
        name:'DataExport',
        component: () => import('@/views/DataManage.vue')
      },
      {
        path:'admin',
        name:'DataManage',
        component:()=>import('@/views/DataManage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router