import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from "@/utils/TokenService";
import MainLayout from "@/layouts/MainLayout";

Vue.use(VueRouter)

  const routes = [
      {
          path: '/auth',
          component: () => import('../layouts/AuthorizationLayout'),
          children: [
              {
                  path: '/login',
                  name: 'login',
                  meta: {
                      public: true,
                      onlyWhenLoggedOut: true
                  },
                  component: () => import('../views/auth/login')
              }
          ]
      },
      {
          path: '',
          component: MainLayout,
          children: [
              {
                  path: '',
                  name: 'dashboard',
                  component: () => import('../views/cabinet/dashboard.vue')
              }
          ]
      }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!TokenService.getToken()
    if (to.name !== 'login' && !isAuthenticated) {
        next({name: 'login'})
    } else {
        if(to.name === 'login' && isAuthenticated) {
            next({name: 'dashboard'})
        } else {
            next()
        }
    }
});

export default router
