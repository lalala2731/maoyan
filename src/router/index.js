import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Center from '../views/Center.vue'
// import Login from '../views/Login'
// import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import NowPlaying from '../views/Film/NowPlaying'
import ComingSoon from '../views/Film/ComingSoon'
import Detail from '../views/Detail.vue'
// import City from '../views/city'

Vue.use(VueRouter)

const routes = [{
  path: '/film',
  name: 'Film',
  component: () =>
    import(/* webpackChunkName: "film" */ '../views/Film.vue'),
  children: [{
    path: 'NowPlaying',
    component: NowPlaying
  },
  {
    path: 'ComingSoon',
    component: ComingSoon
  },
  {
    path: '',
    redirect: 'NowPlaying'
  }
  ]
}, {
  path: '/center',
  name: 'Center',
  component: () =>
    import(/* webpackChunkName: "center" */ '../views/Center.vue')
}, {
  path: '/cinema',
  name: Cinema,
  component: () =>
    import(/* webpackChunkName: "cinema" */ '../views/Cinema.vue')
},
{
  path: '*',
  redirect: '/film'
}, {
  path: '/detail/:myid',
  component: Detail
}, {
  path: '/login',
  component: () =>
    import(/* webpackChunkName: "login" */ '../views/Login.vue')
}, {
  path: '/city',
  component: () =>
    import(/* webpackChunkName: "city" */ '../views/city.vue')
},
{
  path: '/cinema/search',
  component: () =>
    import(/* webpackChunkName: "search" */ '../views/Search.vue')
}
  // {
  //     path: '/',
  //     name: 'Home',
  //     component: Home
  // },
  // {
  //     path: '/about',
  //     name: 'About',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import ( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
