import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todos-page',
      component: require('@/components/ToDos').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
