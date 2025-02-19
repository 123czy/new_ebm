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
        path: '',
        name: 'BestPerformers',
        component: () => import('@/views/BestPerformers.vue')
      },
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
        path: 'management',
        children: [
          {
            path: 'organization',
            children: [
              {
                path: '',
                name: 'DataManageOrganization',
                component: () => import('@/views/DataManage.vue')
              },
              {
                path: ':id',
                name: 'DataManageOrganizationDetail',
                component: () => import('@/views/DataManageDetail.vue')
              },
              {
                path: 'edit/:id',
                name: 'OrganizationEdit',
                component: () => import('@/views/OrganizationEdit.vue')
              },
              {
                path: 'edit/:id/post',
                name: 'OrganizationEditPost',
                component: () => import('@/views/OrganizationEditPost.vue')
              },
              {
                path: 'edit/:id/data',
                name: 'OrganizationEditData',
                component: () => import('@/views/OrganizationEditPost.vue')
              },
              {
                path: 'activity/:id',
                name: 'OrganizationActivity',
                component: () => import('@/views/OrganizationEditPost.vue')
              },
              {
                path: ':id/crawler-log',
                name:'OrganizationCrawlerLog',
                component: () => import('@/views/OrganizationEditPost.vue')
              }
            ]
          },
          {
            path: 'industry',
            name: 'DataImport',
            component: () => import('@/views/DataManage.vue')
          },
          {
            path:'api-user',
            name:'ApiUser',
            component: () => import('@/views/OrganizationEditPost.vue')
          },
          {
            path:'crawler',
            name:'Crawler',
            component: () => import('@/views/OrganizationEditPost.vue')
          },
          {
            path: 'channel',
            name: 'OrganizationChannel',
            component: () => import('@/views/OrganizationEditPost.vue')
          }
        ]
      },
      {
        path:'admin',
        children: [
          {
            path: 'user',
            name: 'AdminUser',
            component: () => import('@/views/OrganizationEditPost.vue')
          },
          {
            path:'activity',
            name:'AdminActivity',
            component: () => import('@/views/OrganizationEditPost.vue')
          },
          {
            path:'notification',
            name:'AdminNotification',
            component: () => import('@/views/OrganizationEditPost.vue')
          },
         
        ]
      },
      {
        path:'ai',
        name:'AiPlatform',
        component: () => import('@/views/AiPlatform/index.vue')
      },
      {
        path:'rule',
        name:'AiPlatformRule',
        component: () => import('@/views/AiPlatform/rule.vue')
      },
      {
        path:'event',
        name:'AiPlatformEvent',
        component: () => import('@/views/AiPlatform/event.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router