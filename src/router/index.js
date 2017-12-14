import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// 页面开始
import login from '@/pages/login' // 登录
import main from '@/pages/admin/main' // 小程序
import miniprogramsadmin from '@/pages/admin/miniprograms/index' // 小程序后台
import miniprogramsadd from '@/pages/admin/miniprograms/add' // 小程序后台
import miniprogramsedit from '@/pages/admin/miniprograms/edit' // 小程序后台
import miniprogramsCases from '@/pages/admin/miniprograms/cases' // 小程序案例
import miniprogramsCasesAdd from '@/pages/admin/miniprograms/cases/add' // 小程序案例
import miniprogramsCasesEdit from '@/pages/admin/miniprograms/cases/edit' // 小程序案例
import industry from '@/pages/admin/industry' // 行业
import miniprograms from '@/pages/miniprograms/index' // 小程序
// 页面结束

// 前端
import mpcases from '@/pages/miniprograms/cases' // 小程序

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'main',
      component: main,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'miniprograms',
          components: {
            main: miniprogramsadmin
          },
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'miniprograms/add',
          components: {
            main: miniprogramsadd
          }
        },
        {
          path: 'miniprograms/edit/:id',
          components: {
            main: miniprogramsedit
          }
        },
        {
          path: 'miniprograms/cases',
          components: {
            main: miniprogramsCases
          },
          children: [
            {
              path: 'add',
              components: {
                main: miniprogramsCases,
                floatbox: miniprogramsCasesAdd
              }
            },
            {
              path: 'edit/:id',
              components: {
                main: miniprogramsCases,
                floatbox: miniprogramsCasesEdit
              }
            }
          ]
        },
        {
          path: 'industry',
          components: {
            main: industry
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/miniprograms',
      name: 'miniprograms',
      component: miniprograms
    },
    {
      path: '/miniprograms/cases',
      name: 'cases',
      component: mpcases
    }
  ]
})

if (window.localStorage.getItem('token')) {
  store.dispatch('login', window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  // 登录后禁止访问
  if (to.meta.cannotlogin) {
    if (store.getters.accessToken) {
      next('/')
    }
  }
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.getters.accessToken) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
