import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import store from '@/store/index'
import NetworkIssue from "../views/NetworkIssue";
import Example from "../views/Example";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'event-list',
            component: EventList,
            props: true
        },
        {
            path: '/event/:id',
            name: 'event-show',
            component: EventShow,
            props: true,
            beforeEnter(routeTo, routeFrom, next) {
                store.dispatch('fetchEvent', routeTo.params.id).then(event => {

                    // since props is set to true, when having a parameter
                    // with the name aligning to the prop,
                    // it will be send in as a prop

                    routeTo.params.event = event
                    next()
                })
                    .catch((error) => {
                        if (error.response && error.response.status === 404) {
                            next({name: '404', params: {resource: 'event'}})
                        } else {
                            next({name: 'network-issue'})
                        }
                    })
            }
        },
        {
            path: '/',
            name: 'event-create',
            component: EventCreate
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '/network-issue',
            name: 'network-issue',
            component: NetworkIssue
        },
        {
            path: '/example',
            component: Example
        },
        {
            path: '*',
            redirect: {name: '404', params: {resource: 'page'}}
        }
    ]
})

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
