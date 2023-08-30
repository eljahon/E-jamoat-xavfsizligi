// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import {women, securtiy} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        // hideChildrenInMenu: true,
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          // {
          //   path: '/dashboard/main',
          //   name: 'DashboardMain',
          //   component: () => import('@/views/dashboard/dashboard'),
          //   meta: { title: 'dashboard', keepAlive: false, permission: ['dashboard'] }
          // },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/jamoat',
            name: 'jamoat',
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: 'menu.dashboard.jamoat', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/path',
            name: 'path',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.path', keepAlive: false, permission: ['dashboard'] }
          }, {
            path: '/dashboard/probatsiya',
            name: 'Analysis',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: 'menu.dashboard.probatsiya ', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/kpi',
            name: 'kpi',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.KPI ', keepAlive: false, permission: ['dashboard'] }
          },
        ]
      },
      // orders
      {
        path: '/preventive',
        name: 'Preventive',
        hideChildrenInMenu: true,
        component: () => import('@/views/orders_delivered/OrderList'),
        meta: { title: 'preventive_service', icon: securtiy, permission: ['preventive'] },
      },
      // main
      {
        path: '/practice',
        name: 'Practice',
        component: () => import('@/views/category/CategoryList'),
        hideChildrenInMenu: true,
        meta: { title: 'administrative_practice', icon: 'menu', permission: ['practice'] },
        // children: [
        //   {
        //     path: '/main/category',
        //     name: 'Category',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/main/category/list',
        //     meta: { title: 'categories', icon: 'form', permission: ['form'] },
        //     children: [
        //       {
        //         path: '/main/category/list',
        //         name: 'CategoryList',
        //         component: () => import('@/views/category/CategoryList'),
        //         meta: { title: 'categories', keepAlive: true, permission: ['form'] }
        //       }
        //     ]
        //   },
        //   {
        //     path: '/main/features',
        //     name: 'Features',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/main/features/list',
        //     meta: { title: 'features', icon: 'dropbox', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/main/features/list',
        //         name: 'FeaturesList',
        //         component: () => import('@/views/features/FeaturesList'),
        //         meta: { title: 'features.list', keepAlive: true, permission: [ 'form' ] }
        //       },
        //       {
        //         path: '/main/features/create',
        //         name: 'FeaturesCreate',
        //         component: () => import('@/views/features/FeaturesCreateWithUpdate'),
        //         meta: { title: 'features.create', keepAlive: true, permission: [ 'form' ] }
        //       },
        //       {
        //         path: '/main/features/edit/:id',
        //         name: 'FeaturesEdit',
        //         component: () => import('@/views/features/FeaturesCreateWithUpdate'),
        //         meta: { title: 'features.update', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   {
        //     path: '/main/brands',
        //     name: 'Brands',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/main/brands/list',
        //     meta: { title: 'brands', icon: 'apple', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/main/brands/list',
        //         name: 'BrandList',
        //         component: () => import('@/views/brands/BrandsList'),
        //         meta: { title: 'brands.list', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   {
        //     path: '/main/measure',
        //     name: 'Measure',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/main/measure/list',
        //     meta: { title: 'measures', icon: 'paper-clip', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/main/measure/list',
        //         name: 'measureList',
        //         component: () => import('@/views/measure/MeasureList'),
        //         meta: { title: 'measures.list', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        // ]
      },
      // supplier
      {
        path: '/womens',
        name: 'Womens',
        component: () => import('@/views/supplier/SupplierList'),
        hideChildrenInMenu: true,
        meta: { title: 'women_issues', icon: women, permission: ['womens'] },
      },
      // product_groups
      {
        path: '/young-people',
        name: 'YoungPeople',
        hideChildrenInMenu: true,
        component: () => import('@/views/product_groups/ProductsList'),
        meta: { title: 'young_people', icon: 'smile', permission: ['YoungPeople'] },
        // children: [
        //   {
        //     path: '/products/product-group',
        //     name: 'product-group',
        //     hideChildrenInMenu: true,
        //     redirect: '/products/product-group/list',
        //     component: RouteView,
        //     meta: { title: 'product-groups', icon: 'shop', permission: ['form'] },
        //     children: [
        //       {
        //         path: '/products/product-group/list',
        //         name: 'ProductGroupsList',
        //         component: () => import('@/views/product_groups/ProductsList'),
        //         meta: { title: 'product-groups.list', keepAlive: true, permission: [ 'form' ] }
        //       },
        //       {
        //         path: '/products/product-group/create/:step',
        //         name: 'ProductGroupsCreate',
        //         component: () => import('@/views/product_groups/ProductsCreateWithUpdate'),
        //         meta: { title: 'product-groups.create', keepAlive: true, permission: [ 'form' ] }
        //       },
        //       {
        //         path: '/products/product-group/edit/:step',
        //         name: 'ProductGroupsEdit',
        //         component: () => import('@/views/product_groups/ProductsCreateWithUpdate'),
        //         meta: { title: 'product-groups.edit', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   {
        //     path: '/products/product',
        //     name: 'product',
        //     hideChildrenInMenu: true,
        //     redirect: '/products/product/list',
        //     component: RouteView,
        //     meta: { title: 'products', icon: 'shop', permission: ['form'] },
        //     children: [
        //       {
        //         path: '/products/product/list',
        //         name: 'ProductList',
        //         component: () => import('@/views/products/List'),
        //         meta: { title: 'products', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   }
        // ]
      },
      // pages and widgets
      {
        path: '/pages_and_widgets',
        component: () => import('@/views/widget/WidgetList'),
        name: 'Public',
        hideChildrenInMenu: true,
        meta: { title: 'public', icon: 'team', permission: ['public'] },
      },

      // reports
      {
        path: '/reports',
        name: 'ReportsBySold',
        hideChildrenInMenu: true,
        component: () => import('@/views/category/CategoryList'),
        meta: {title: 'reports', icon: 'file-search', permission: ['reports']},
      },
      // statistics
      {
        path: '/analysis',
        name: 'analysis',
        component: () => import('@/views/TestRouter'),
        meta: { title: 'analysis', icon: 'bar-chart', permission: ['analysis'] },
      },
      // notifications,
      // settings
      {
        path: '/settings',
        name: 'locationList',
        component: () => import('@/views/location/LocationList'),
        hideChildrenInMenu: true,
        meta: { title: 'settings', icon: 'setting', permission: ['settings'] },
        // children: [
        //   // location
        //   {
        //     path: '/settings/location',
        //     hideChildrenInMenu: true,
        //     name: 'locationList',
        //     component: () => import('@/views/location/LocationList'),
        //     meta: { title: 'location', icon: 'environment', permission: [ 'form' ] },
        //     // children: [
        //     //   {
        //     //     path: '/settings/location/list',
        //     //     name: 'locationList',
        //     //     component: () => import('@/views/location/LocationList'),
        //     //     meta: { title: 'location.list', keepAlive: true, permission: [ 'form' ] }
        //     //   }
        //     // ]
        //   },
        //   // deliveryTypes
        //   {
        //     path: '/settings/deliveryTypes',
        //     name: 'DeliveryTypes',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/settings/deliveryTypes/list',
        //     meta: { title: 'delivery_type', icon: 'rocket', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/settings/deliveryTypes/list',
        //         name: 'deliveryTypesList',
        //         component: () => import('@/views/delivery_type/DeliveryTypeList'),
        //         meta: { title: 'delivery_type.list', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   // complaintTypes
        //   {
        //     path: '/settings/complaintTypes',
        //     name: 'ComplaintTypes',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/settings/complaintTypes/list',
        //     meta: { title: 'complaint_type', icon: 'sound', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/settings/complaintTypes/list',
        //         name: 'ComplaintTypesList',
        //         component: () => import('@/views/complaint_type/ComplaintTypesList'),
        //         meta: { title: 'complaint_type.list', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   // vacancy
        //   {
        //     path: '/settings/vacancy',
        //     name: 'Vacancy',
        //     hideChildrenInMenu: true,
        //     component: RouteView,
        //     redirect: '/settings/vacancy/list',
        //     meta: { title: 'vacancy', icon: 'contacts', permission: [ 'form' ] },
        //     children: [
        //       {
        //         path: '/settings/vacancy/list',
        //         name: 'VacancyList',
        //         component: () => import('@/views/vacancy/VacancyList'),
        //         meta: { title: 'vacancy.list', keepAlive: true, permission: [ 'form' ] }
        //       }
        //     ]
        //   },
        //   // main setting
        //   {
        //     path: '/settings/main',
        //     name: 'SettingsMain',
        //     hideChildrenInMenu: true,
        //     component: () => import('@/views/setting/Setting'),
        //     meta: { title: 'main_setting', icon: 'setting', permission: [ 'form' ] },
        //     children: [
        //     ]
        //   },
        // ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
