// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

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
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: 'dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] }
        // children: [
        //   // {
        //   //   path: '/dashboard/analysis',
        //   //   name: 'Analysis',
        //   //   component: () => import('@/views/dashboard/Analysis'),
        //   //   meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
        //   // }
        //   // {
        //   //   path: 'https://www.baidu.com/',
        //   //   name: 'Monitor',
        //   //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
        //   // }
        //   // {
        //   //   path: '/dashboard/workplace',
        //   //   name: 'Workplace',
        //   //   component: () => import('@/views/dashboard/Workplace'),
        //   //   meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
        //   // }
        // ]
      },
      // orders
      {
        path: '/orders',
        redirect: '/orders/main',
        component: RouteView,
        meta: { title: 'orders', icon: 'inbox', permission: ['form'] },
        children: [
          {
            path: '/orders/main',
            name: 'OrdersMain',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/main/category/list',
            meta: { title: 'allOrder', keepAlive: true, permission: ['form'] },
            children: [
              // {
              //   path: '/main/category/list',
              //   name: 'CategoryList',
              //   component: () => import('@/views/category/CategoryList'),
              //   meta: { title: 'categories', keepAlive: true, permission: ['form'] }
              // }
            ]
          },
          {
            path: '/orders/orders_in_delivery',
            name: 'OrdersInDelivery',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/main/features/list',
            meta: { title: 'orders_in_delivery', keepAlive: true, permission: [ 'form' ] },
            children: [
              // {
              //   path: '/main/features/list',
              //   name: 'FeaturesList',
              //   component: () => import('@/views/features/FeaturesList'),
              //   meta: { title: 'features.list', keepAlive: true, permission: [ 'form' ] }
              // },
              // {
              //   path: '/main/features/create',
              //   name: 'FeaturesCreate',
              //   component: () => import('@/views/features/FeaturesCreateWithUpdate'),
              //   meta: { title: 'features.create', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
        ]
      },
      // main
      {
        path: '/main',
        redirect: '/main/category',
        component: RouteView,
        meta: { title: 'main', icon: 'apartment', permission: ['form'] },
        children: [
          {
            path: '/main/category',
            name: 'Category',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/main/category/list',
            meta: { title: 'categories', icon: 'form', permission: ['form'] },
            children: [
              {
                path: '/main/category/list',
                name: 'CategoryList',
                component: () => import('@/views/category/CategoryList'),
                meta: { title: 'categories', keepAlive: true, permission: ['form'] }
              }
            ]
          },
          {
            path: '/main/features',
            name: 'Features',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/main/features/list',
            meta: { title: 'features', icon: 'dropbox', permission: [ 'form' ] },
            children: [
              {
                path: '/main/features/list',
                name: 'FeaturesList',
                component: () => import('@/views/features/FeaturesList'),
                meta: { title: 'features.list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/main/features/create',
                name: 'FeaturesCreate',
                component: () => import('@/views/features/FeaturesCreateWithUpdate'),
                meta: { title: 'features.create', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          {
            path: '/main/brands',
            name: 'Brands',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/main/brands/list',
            meta: { title: 'brands', icon: 'apple', permission: [ 'form' ] },
            children: [
              {
                path: '/main/brands/list',
                name: 'BrandList',
                component: () => import('@/views/brands/BrandsList'),
                meta: { title: 'brands.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          {
            path: '/main/measure',
            name: 'Measure',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/main/measure/list',
            meta: { title: 'measures', icon: 'paper-clip', permission: [ 'form' ] },
            children: [
              {
                path: '/main/measure/list',
                name: 'measureList',
                component: () => import('@/views/measure/MeasureList'),
                meta: { title: 'measures.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
      },
      // supplier
      {
        path: '/supplier_all',
        redirect: '/supplier_all/supplier',
        component: RouteView,
        meta: { title: 'supplier', icon: 'scan', permission: ['form'] },
        children: [
          {
            path: '/supplier_all/supplier',
            name: 'supplier',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/supplier/list',
            meta: { title: 'supplier', permission: [ 'form' ] },
            children: [
              {
                path: '/supplier/list',
                name: 'supplierList',
                component: () => import('@/views/supplier/SupplierList'),
                meta: { title: 'supplier.list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/supplier/preview/:id',
                name: 'supplierPreview',
                component: () => import('@/views/supplier/Preview'),
                meta: { title: 'supplier.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // {
          //   path: '/supplier_all/supplierStore',
          //   name: 'supplierStore',
          //   hideChildrenInMenu: true,
          //   component: RouteView,
          //   redirect: '/supplierStore/list',
          //   meta: { title: 'supplier_store', permission: [ 'form' ] },
          //   children: [
          //     {
          //       path: '/supplierStore/list',
          //       name: 'supplierStoreList',
          //       component: () => import('@/views/supplierStore/SupplierStoreList'),
          //       meta: { title: 'supplier_store.list', keepAlive: true, permission: [ 'form' ] }
          //     }
          //   ]
          // },
        ]
      },
      // products
      {
        path: '/products',
        redirect: '/products/main',
        component: RouteView,
        meta: { title: 'products', icon: 'shop', permission: ['form'] },
        children: [
          {
            path: '/products/main',
            name: 'Products',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/products/main/list',
            meta: { title: 'products', icon: 'shop', permission: [ 'form' ] },
            children: [
              {
                path: '/products/main/list',
                name: 'ProductsList',
                component: () => import('@/views/products/ProductsList'),
                meta: { title: 'product_list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/products/main/create',
                name: 'ProductsCreate',
                component: () => import('@/views/products/ProductsCreateWithUpdate'),
                meta: { title: 'Product Create', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          }
        ]
      },
      // pages and widgets
      {
        path: '/pages_and_widgets',
        redirect: '/pages_and_widgets/widget',
        component: RouteView,
        meta: { title: 'pages_and_widgets', icon: 'block', permission: ['form'] },
        children: [
          // widget
          {
            path: '/pages_and_widgets/widget',
            name: 'Widget',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/pages_and_widgets/widget/list',
            meta: { title: 'widget', icon: 'picture', permission: [ 'form' ] },
            children: [
              {
                path: '/pages_and_widgets/widget/list',
                name: 'WidgetList',
                component: () => import('@/views/widget/WidgetList'),
                meta: { title: 'widget.list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/pages_and_widgets/widget/create',
                name: 'WidgetCreate',
                component: () => import('@/views/widget/WidgetCreateWithUpdate'),
                meta: { title: 'widget.list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/pages_and_widgets/widget/update/:id',
                name: 'WidgetUpdate',
                component: () => import('@/views/widget/WidgetCreateWithUpdate'),
                meta: { title: 'widget.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // article
          {
            path: '/pages_and_widgets/article',
            name: 'Article',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/pages_and_widgets/article/list',
            meta: { title: 'article', icon: 'file', permission: [ 'form' ] },
            children: [
              {
                path: '/pages_and_widgets/article/list',
                name: 'ArticleList',
                component: () => import('@/views/article/ArticleList'),
                meta: { title: 'article.list', keepAlive: true, permission: [ 'form' ] }
              },
              {
                path: '/pages_and_widgets/article/create',
                name: 'ArticleCreate',
                component: () => import('@/views/article/ArticleCreateWithUpdate'),
                meta: { title: 'article.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
      },
      // settings
      {
        path: '/settings',
        redirect: '/settings/location',
        component: RouteView,
        meta: { title: 'settings', icon: 'setting', permission: ['form'] },
        children: [
          // location
          {
            path: '/settings/location',
            name: 'Location',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/settings/location/list',
            meta: { title: 'location', icon: 'environment', permission: [ 'form' ] },
            children: [
              {
                path: '/settings/location/list',
                name: 'locationList',
                component: () => import('@/views/location/LocationList'),
                meta: { title: 'location.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // deliveryTypes
          {
            path: '/settings/deliveryTypes',
            name: 'DeliveryTypes',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/settings/deliveryTypes/list',
            meta: { title: 'delivery_type', icon: 'rocket', permission: [ 'form' ] },
            children: [
              {
                path: '/settings/deliveryTypes/list',
                name: 'deliveryTypesList',
                component: () => import('@/views/delivery_type/DeliveryTypeList'),
                meta: { title: 'delivery_type.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // complaintTypes
          {
            path: '/settings/complaintTypes',
            name: 'ComplaintTypes',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/settings/complaintTypes/list',
            meta: { title: 'complaint_type', icon: 'sound', permission: [ 'form' ] },
            children: [
              {
                path: '/settings/complaintTypes/list',
                name: 'ComplaintTypesList',
                component: () => import('@/views/complaint_type/ComplaintTypesList'),
                meta: { title: 'complaint_type.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // vacancy
          {
            path: '/settings/vacancy',
            name: 'Vacancy',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/settings/vacancy/list',
            meta: { title: 'vacancy', icon: 'contacts', permission: [ 'form' ] },
            children: [
              {
                path: '/settings/vacancy/list',
                name: 'VacancyList',
                component: () => import('@/views/vacancy/VacancyList'),
                meta: { title: 'vacancy.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // main setting
          {
            path: '/settings/main',
            name: 'SettingsMain',
            hideChildrenInMenu: true,
            component: () => import('@/views/setting/Setting'),
            meta: { title: 'main_setting', icon: 'setting', permission: [ 'form' ] },
            children: [
            ]
          },
        ]
      },
      // users
      {
        path: '/users',
        redirect: '/users/stuff',
        component: RouteView,
        meta: { title: 'users', icon: 'team', permission: ['form'] },
        children: [
          // stuff main
          {
            path: '/users/stuff',
            name: 'StuffMain',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/users/stuff/list',
            meta: { title: 'users', icon: 'user', permission: [ 'form' ] },
            children: [
              {
                path: '/users/stuff/list',
                name: 'StuffList',
                component: () => import('@/views/staff/StaffList'),
                meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // couriers
          {
            path: '/user/courier',
            name: 'Courier',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/user/courier/list',
            meta: { title: 'couriers', icon: 'car', permission: [ 'form' ] },
            children: [
              {
                path: '/user/courier/list',
                name: 'CourierList',
                component: () => import('@/views/couriers/CourierList'),
                meta: { title: 'couriers.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // users
          {
            path: '/users/user',
            name: 'Users',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/users/user/list',
            meta: { title: 'users', icon: 'team', permission: [ 'form' ] },
            children: [
              {
                path: '/users/user/list',
                name: 'UserList',
                component: () => import('@/views/TestRouter'),
                meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          // roles
          {
            path: '/users/role',
            name: 'UserRole',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/users/role/list',
            meta: { title: 'roles', icon: 'solution', permission: [ 'form' ] },
            children: [
              {
                path: '/users/role/list',
                name: 'UserRoleList',
                component: () => import('@/views/TestRouter'),
                meta: { title: 'roles.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
      },
      // reports
      {
        path: '/reports',
        redirect: '/reports/reports_by_sold',
        component: RouteView,
        meta: {title: 'reports', icon: 'file-search', permission: ['form']},
        children: [
          {
            path: '/reports/reports_by_sold',
            name: 'ReportsBySold',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/settings/location/list',
            meta: { title: 'reports_by_sold', icon: 'file-text', permission: [ 'form' ] },
            children: [
              // {
              //   path: '/settings/location/list',
              //   name: 'locationList',
              //   component: () => import('@/views/location/LocationList'),
              //   meta: { title: 'location.list', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
        ]
      },
      // statistics
      {
        path: '/statistics',
        redirect: '/statistics/search_histories',
        component: RouteView,
        meta: { title: 'statistics', icon: 'bar-chart', permission: ['form'] },
        children: [
          // search histories
          {
            path: '/statistics/search_histories',
            name: 'SearchHistories',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/users/stuff/list',
            meta: { title: 'search_histories', icon: 'fund', permission: [ 'form' ] },
            children: [
              // {
              //   path: '/users/stuff/list',
              //   name: 'StuffList',
              //   component: () => import('@/views/staff/StaffList'),
              //   meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
          // top sold products
          {
            path: '/statistics/top_sold_products',
            name: 'TopSoldProducts',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/users/stuff/list',
            meta: { title: 'top_sold_products', icon: 'fund', permission: [ 'form' ] },
            children: [
              // {
              //   path: '/users/stuff/list',
              //   name: 'StuffList',
              //   component: () => import('@/views/staff/StaffList'),
              //   meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
          // top clients
          {
            path: '/statistics/top_clients',
            name: 'TopClients',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/users/stuff/list',
            meta: { title: 'top_clients', icon: 'fund', permission: [ 'form' ] },
            children: [
              // {
              //   path: '/users/stuff/list',
              //   name: 'StuffList',
              //   component: () => import('@/views/staff/StaffList'),
              //   meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
          // top pages
          {
            path: '/statistics/top_pages',
            name: 'TopPages',
            hideChildrenInMenu: true,
            component: () => import('@/views/TestRouter'),
            // redirect: '/users/stuff/list',
            meta: { title: 'top_pages', icon: 'fund', permission: [ 'form' ] },
            children: [
              // {
              //   path: '/users/stuff/list',
              //   name: 'StuffList',
              //   component: () => import('@/views/staff/StaffList'),
              //   meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
              // }
            ]
          },
        ]
      },
      // notifications
      {
        path: '/notifications',
        name: 'Notifications',
        hideChildrenInMenu: true,
        // redirect: '/statistics/search_histories',
        component: () => import('@/views/TestRouter'),
        meta: { title: 'notifications', icon: 'bell', permission: ['form'] },
        children: []
      },
      // complaints
      {
        path: '/complaints',
        name: 'Complaints',
        hideChildrenInMenu: true,
        // redirect: '/statistics/search_histories',
        component: () => import('@/views/TestRouter'),
        meta: { title: 'complaints', icon: 'alert', permission: ['form'] },
        children: []
      },
      // discounts
      {
        path: '/discounts',
        redirect: '/discounts/coupons',
        component: RouteView,
        meta: { title: 'discounts', icon: 'shopping', permission: ['form'] },
        children: [
          // coupons
          {
            path: '/discounts/coupons',
            name: 'CouponsMain',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/discounts/coupons/list',
            meta: { title: 'coupons', icon: 'tags', permission: [ 'form' ] },
            children: [
              {
                path: '/discounts/coupons/list',
                name: 'CouponsList',
                component: () => import('@/views/Coupons/CouponsList'),
                meta: { title: 'coupons.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
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
