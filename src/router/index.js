import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function lazyLoad(view) {
  return() => import (`../views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: lazyLoad('Home')
  },
  {
    path: '/about',
    name: 'About',
    component: lazyLoad('Rechercher')
  },
  {
    path: '/bibliotheque',
    name: 'Bibliothèque',
    component: lazyLoad('Bibliotheque')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
