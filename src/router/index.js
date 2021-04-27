import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
Vue.use(Router)


const routes =[

    {
        path: '/login/:loginStatus',
        meta: {
            title: '登录注册'
        },
        component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: '商品列表'
        },
        component: (resolve) => require(['../views/index.vue'], resolve),
        children:[
          {
              path: '/list',
              meta: {
                  title: 'list'
              },
              component: (resolve) => require(['../views/layout/list'], resolve)
          },
          {
            path:'/car',
            meta:{
              title:'购物车',
            },
            component:(resolve) => require(['../views/layout/car'],resolve)
          },
          {
            path:'/proudct/:id',
            meta:{
              title:'产品详情',
            },
            component:(resolve) => require(['../views/layout/product'],resolve)
          }
        ]
    },

    {
        path: '*',
        redirect: '/login/login'
    }
  ]
const router =  new Router({
  mode:'history',
  routes

})

 router.beforeEach((to,from,next) =>{

    window.document.title = to.meta.title;
    next()
  })

  router.afterEach((to,from,next) =>{
      window.scrollTo()
  })

  const VueRouterPush = Router.prototype.push
  Router.prototype.push = function push(to){
    return VueRouterPush.call(this,to).catch(err =>err)
  }
export default router
