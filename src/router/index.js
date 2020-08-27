import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '/',
      name: 'event-create',
      component: EventCreate
    }
  ]
})
