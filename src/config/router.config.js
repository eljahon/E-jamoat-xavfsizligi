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
      // article
      {
        path: '/article',
        name: 'article',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/article/list',
        meta: { title: 'Article', icon: 'file', permission: [ 'form' ] },
        children: [
          {
            path: '/article/list',
            name: 'articleList',
            component: () => import('@/views/article/ArticleList'),
            meta: { title: 'Article List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // category
      {
        path: '/category/list',
        name: 'category',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/category/list',
        meta: { title: 'categories', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/category/list',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: 'categories', keepAlive: true, permission: [ 'form' ] }
          }
          // {
          //   path: '/category/product/:categoryId',
          //   name: 'CategoryProduct',
          //   component: () => import('@/views/products/ProductList'),
          //   meta: { title: 'products', keepAlive: true, permission: [ 'form' ] }
          // }
        ]
      },
      // order
      // {
      //   path: '/order',
      //   name: 'order',
      //   hideChildrenInMenu: true,
      //   component: RouteView,
      //   redirect: '/order/list',
      //   meta: { title: 'order', icon: 'shop', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/order/list',
      //       name: 'OrderList',
      //       component: () => import('@/views/order/orderList'),
      //       meta: { title: 'order_list', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // },
      // couriers
      {
        path: '/courier',
        name: 'courier',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/courier/list',
        meta: { title: 'Couriers', icon: 'car', permission: [ 'form' ] },
        children: [
          {
            path: '/courier/list',
            name: 'CourierList',
            component: () => import('@/views/couriers/CourierList'),
            meta: { title: 'Courier List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // brands
      {
        path: '/brands',
        name: 'brands',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/brands/list',
        meta: { title: 'Brands', icon: 'apple', permission: [ 'form' ] },
        children: [
          {
            path: '/brands/list',
            name: 'BrandList',
            component: () => import('@/views/brands/BrandsList'),
            meta: { title: 'Brand List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // complait types
      {
        path: '/complaintTypes',
        name: 'complaintTypes',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/complaintTypes/list',
        meta: { title: 'Complaint Types', icon: 'sound', permission: [ 'form' ] },
        children: [
          {
            path: '/complaintTypes/list',
            name: 'complaintTypesList',
            component: () => import('@/views/complaint_type/ComplaintTypesList'),
            meta: { title: 'Complaint Types List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // deliveryTypes
      {
        path: '/deliveryTypes',
        name: 'deliveryTypes',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/deliveryTypes/list',
        meta: { title: 'Delivery Types', icon: 'rocket', permission: [ 'form' ] },
        children: [
          {
            path: '/deliveryTypes/list',
            name: 'deliveryTypesList',
            component: () => import('@/views/delivery_type/DeliveryTypeList'),
            meta: { title: 'Delivery Types List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // location
      {
        path: '/location',
        name: 'location',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/location/list',
        meta: { title: 'Location', icon: 'environment', permission: [ 'form' ] },
        children: [
          {
            path: '/location/list',
            name: 'locationList',
            component: () => import('@/views/location/LocationList'),
            meta: { title: 'Location List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // measure
      {
        path: '/measure',
        name: 'measure',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/measure/list',
        meta: { title: 'Measure', icon: 'paper-clip', permission: [ 'form' ] },
        children: [
          {
            path: '/measure/list',
            name: 'measureList',
            component: () => import('@/views/measure/MeasureList'),
            meta: { title: 'Measure List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // vacancy
      {
        path: '/vacancy',
        name: 'vacancy',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/vacancy/list',
        meta: { title: 'Vacancy', icon: 'contacts', permission: [ 'form' ] },
        children: [
          {
            path: '/vacancy/list',
            name: 'vacancyList',
            component: () => import('@/views/vacancy/VacancyList'),
            meta: { title: 'Vacancy List', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // supplier
      {
        path: '/supplier_all',
        redirect: '/supplier_all/supplier',
        component: RouteView,
        meta: { title: 'Supplier', icon: 'scan', permission: ['form'] },
        children: [
          {
            path: '/supplier_all/supplier',
            name: 'supplier',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/supplier/list',
            meta: { title: 'Supplier', permission: [ 'form' ] },
            children: [
              {
                path: '/supplier/list',
                name: 'supplierList',
                component: () => import('@/views/supplier/SupplierList'),
                meta: { title: 'Supplier List', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          {
            path: '/supplier_all/supplierStore',
            name: 'supplierStore',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/supplierStore/list',
            meta: { title: 'Supplier Store', permission: [ 'form' ] },
            children: [
              {
                path: '/supplierStore/list',
                name: 'supplierStoreList',
                component: () => import('@/views/supplierStore/SupplierStoreList'),
                meta: { title: 'Supplier Store List', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
      },
      // products

      // {
      //   path: '/product',
      //   name: 'products',
      //   hideChildrenInMenu: true,
      //   component: RouteView,
      //   redirect: '/product/list',
      //   meta: { title: 'products', icon: 'shop', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/product/list',
      //       name: 'ProductList',
      //       component: () => import('@/views/products/ProductList'),
      //       meta: { title: 'products', keepAlive: true, permission: [ 'table' ] }
      //     }
      //   ]
      // },
      // {
      //   path: '/attrs',
      //   name: 'attributes',
      //   hideChildrenInMenu: true,
      //   component: RouteView,
      //   redirect: '/attrs/list',
      //   meta: { title: 'attrs', icon: 'project', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/attrs/list',
      //       name: 'AtributesList',
      //       component: () => import('@/views/attrs/AttrsList'),
      //       meta: { title: 'attrs', keepAlive: true, permission: [ 'table' ] }
      //     }
      //   ]
      // }

      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // }

      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: RouteView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },

      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
      //         }
      //       ]
      //     }
      //   ]
      // }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
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
