import EventService from '@/services/EventService.js'

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, number) {
    state.eventsTotal = number
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        commit('SET_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Successfully created an event.'
        }
        dispatch('add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an error' + error.message
        }
        dispatch('add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was an error' + error.message
        }
        dispatch('add', notification, { root: true })
      })
  },
  fetchEvent({ commit }, id) {
    var event = this.getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })

    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
