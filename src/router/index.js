import Vue from 'vue'
import Router from 'vue-router'
import yuqingdongtai from 'components/yuqingdongtai/yuqingdongtai'
import yuqingfenxi from 'components/yuqingfenxi/yuqingfenxi'
import advancedSearch from 'components/advancedSearch/advancedSearch'
import personalCenter from 'components/personalCenter/personalCenter'
// import messageTip from 'components/messageTip/messageTip'
import notFound from 'components/pageTips/notFound/notFound'
import login from 'pages/login/index'
import signout from 'pages/signout/index'
import register from 'pages/register/index'
import resetPwd from 'pages/resetPwd/index'
import detail from 'components/detail/detail'
import singlePage from 'singlePage/index'
Vue.use(Router)
// const detail = resolve => require(['components/detail/detail'], resolve)
export default new Router({

  routes: [
    {
      path: '/yuqingdongtai',
      name: 'yuqingdongtai',
      component: yuqingdongtai,
       meta: {
                  keepAlive: true
              },
      /*children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/yuqingdongtai/detail/:id',
          name:'detail',

          meta: { auth: false },
          component: detail
        }
      ]*/
    },
    {
      path: '/yuqingfenxi',
      name: 'yuqingfenxi',
      component: yuqingfenxi,
       meta: {
                  keepAlive: true
              }

    },
    {
      path: '/advancedSearch',
      name: 'advancedSearch',
      component: advancedSearch
    },
    // {
    //   path: '/messageTip/:id',
    //   name: 'messageTip',
    //   component: messageTip
    // },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: personalCenter
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signout',
      name: 'signout',
      component: signout
    },
    {
      path: '/register',
      meta: { auth: false },
      name: 'register',
      component: register
    },
    {
      path: '/resetPwd',
      meta: { auth: false },
      name: 'resetPwd',
      component: resetPwd
    },
    {
      path: '/notFound',
      meta: { auth: false },
      name: 'notFound',
      component: notFound
    },
    {
      path: '/detail/:id',
      name:'detail',
      meta: { auth: false },
      component: detail

    },
    {
      path: '/', //首页
      component: resolve => require(['pages/login/index'], resolve)
    },
    {
      path: '/singlePage/:myKey',
      meta: { auth: false },
      name: 'singlePage',
      component: singlePage
    },
  ],
  linkActiveClass: 'active'
})

