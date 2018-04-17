import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import home from '@/views/home/home.vue'
import me from '@/views/me/me.vue'
import login from '@/views/login.vue'
import store from '../store/store'

Vue.use(Router)
const routes = [
  {
    path: '/',
    component: index,
    meta: {
      requireAuth: true
    },
    children: [
      {
        name: '',
        path: '/home',
        component: home
      },
      {
        name: 'me',
        path: '/me',
        component: me
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (to.path === '/login') {
      next()
    } else {
      if (store.state.UserToken) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  } else {
    next()
  }
})

export default router
