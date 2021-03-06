<template>
    <div>
        <h1>Create your own event!</h1>
        <form @submit.prevent="createEvent">

            <BaseSelect label="Select a category"
                        v-model="event.category"
                        :options="categories"
                        :class="{ error: $v.event.category.$error }"
                        @blur="$v.event.category.$touch()"/>

            <template v-if="$v.event.category.$error">
                <p v-if="!$v.event.category.required" class="errorMessage">
                    Category is required </p>
            </template>

            <h3>Name & describe your event</h3>
            <BaseInput label="Title"
                       v-model="event.title"
                       type="text"
                       placeholder="Title"
                       :class="{ error: $v.event.title.$error }"
                       @blur="$v.event.title.$touch()"/>

            <template v-if="$v.event.title.$error">
                <p v-if="!$v.event.title.required" class="errorMessage">
                    Title is required </p>
            </template>

            <BaseInput v-model="event.description"
                       type="text" placeholder="Description"/>


            <h3>Where is your event?</h3>
            <BaseInput label="Location"
                       v-model="event.location"
                       type="text"
                       placeholder="Add a location"/>


            <h3>When is your event?</h3>
            <BaseSelect label="Select a time"
                        :options="times"
                        :class="{ error: $v.event.time.$error}"
                        v-model="event.time"
                        @blur="$v.event.time.$touch()"
            />

            <template v-if="$v.event.time.$error">
                <p v-if="!$v.event.time.required" class="errorMessage">
                    Time is required </p>
            </template>

            <div class="field">
                <label> Date </label>
                <datepicker v-model="event.date"
                            placeholder="Select a date"/>
            </div>


            <BaseButton type="submit" buttonClass="-fill-gradient">
                Submit
            </BaseButton>
            <p v-if="$v.$anyError"> Please, fill out the required fields. </p>
        </form>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    import NProgress from 'nprogress'
    import {required} from 'vuelidate/lib/validators'

    export default {
        components: {
            Datepicker
        },
        data() {
            const times = []
            for (let i = 1; i <= 24; i++) {
                times.push(i + ':00')
            }
            return {
                times,
                categories: this.$store.state.categories,
                event: this.createFreshEventObject()
            }
        },
        validations: {
            event: {
                category: {required},
                title: {required},
                description: {required},
                location: {required},
                date: {required},
                time: {required}
            }
        },
        methods: {
            createEvent() {
                // make all the fields dirty
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    NProgress.start()
                    this.$store
                        .dispatch('createEvent', this.event)
                        .then(() => {
                            this.$router.push({
                                name: 'event-show',
                                params: {id: this.event.id}
                            })
                            this.event = this.createFreshEventObject()
                        })
                        .catch(() => {
                            NProgress.done()
                        })
                }
            },
            createFreshEventObject() {
                const user = this.$store.state.user.user
                const id = Math.floor(Math.random() * 1000000)

                return {
                    id: id,
                    user: user,
                    category: '',
                    organizer: user,
                    title: '',
                    description: '',
                    location: '',
                    date: '',
                    time: '',
                    attendees: []
                }
            }
        }
    }
</script>

<style scoped>
    .field {
        margin-bottom: 24px;
    }
</style>
