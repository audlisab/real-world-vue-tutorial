<template>
    <div>
        <h1>Events for {{ user.user.name }}</h1>
        <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
        <template v-if="page !== 1">
            <router-link
                    :to="{ name: 'event-list', query: { page: page - 1 } }"
                    rel="prev"
            >
                Previous
            </router-link>
        </template>
        <template v-if="this.page !== 1 && hasNextPage"> |</template>
        <template v-if="hasNextPage">
            <router-link
                    :to="{ name: 'event-list', query: { page: page + 1 } }"
                    rel="next"
            >
                Next
            </router-link>
        </template>
    </div>
</template>

<script>
    import EventCard from '../views/EventCard.vue'
    import {mapState} from 'vuex'
    import store from '@/store/index'

    function getPageEvents(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        store.dispatch('fetchEvents', {
            page: currentPage
        }).then(() => {
            // change the page as the data is updated
            routeTo.params.page = currentPage
            next()
        })
    }

    export default {
        props: {
          page: {
              type: Number,
              required: true
          }
        },
        components: {
            EventCard
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageEvents(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            getPageEvents(routeTo, next)
        },
        computed: {
            hasNextPage() {
                return this.event.eventsTotal > this.page * this.event.perPage
            },
            ...mapState(['user', 'event'])
        }
    }
</script>

