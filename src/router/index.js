import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Detection from "../components/detection/detection.vue"
import MainLine from "../components/detection/mainline.vue"


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, 
  children: [
    { path: '/detection', component: Detection},
    { path: '/mainline', component: MainLine}
  ]

  },

]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   if (to.path === '/register') return next()
//   if (to.path === '/admin') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace=function replace(location) {
    return originalReplace.call(this,location).catch(err => err)
};

export default router
