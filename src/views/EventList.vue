<template>
  <div>
    <h1>Event listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '../views/EventCard.vue'
import EventService from "../services/EventService";

export default {
  components: {
    EventCard
  },
  created() {
    EventService
      .getEvents()
      .then(response => {
        console.log(response.data)
        this.events = response.data
      })
      .catch(errors => {
        console.log(errors)
      })
  },
  data() {
    return {
      events: []
    }
  }
}
</script>
