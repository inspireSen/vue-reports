import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // route level code-splitting
    // this generates a separate chunk (holiday.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    path: '/holiday',
    name: 'Holiday',
    component: () => import('../views/configuration/Holiday.vue')
  },
  {
    path: '/population',
    name: 'Population',
    component: () => import('../views/configuration/Population.vue')
  },
  {
    path: '/report1',
    component: () => import('../views/report/report1/Report1.vue'),
    children: [
      {
        path: '', name: 'Report1Summary', component: () => import('../views/report/report1/Report1Summary.vue')
      },
      {
        path: 'detail',
        name: 'Report1Detail',
        props: true,
        component: () => import('../views/report/report1/Report1Detail.vue'),
      }
    ]
  },
  {
    path: '/report2',
    name: 'Report2',
    component: () => import('../views/report/Report2.vue')
  },
  {
    path: '/report3',
    name: 'Report3',
    component: () => import('../views/report/Report3.vue')
  },
  {
    path: '/report4',
    name: 'Report4',
    component: () => import('../views/report/Report4.vue')
  },
  {
    path: '/report5',
    name: 'Report5',
    component: () => import('../views/report/Report5.vue')
  },
  {
    path: '/report6',
    name: 'Report6',
    component: () => import('../views/report/Report6.vue')
  },
  {
    path: '/report7',
    name: 'Report7',
    component: () => import('../views/report/Report7.vue')
  },
  {
    path: '/report8',
    component: () => import('../views/report/report8/Report8.vue'),
    children: [
      {
        path: '', name: 'Report8Summary', component: () => import('../views/report/report8/Report8Summary.vue')
      },
      {
        path: 'detailYear',
        name: 'Report8DetailYear',
        props: route => ({
          parentData: {
            Year: route.query.year,
            TotalNumberOfMembershipsInYear: route.query.numOfMemberships
          },
        }),
        component: () => import('../views/report/report8/Report8DetailYear.vue'),
      },
      {
        path: 'detailYearCity',
        name: 'Report8DetailYearCity',
        props: true,
        component: () => import('../views/report/report8/Report8DetailYearCity.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
