<template>
<form @submit.prevent="submit">
<input type="email"
       placeholder="What's your email?"
       v-model="email"
       :class=" {error: $v.email.$error }"
       @blur="$v.email.$touch()"/>

        <!--  touch() changes a  dirty flag to true,
        causes an error gs to be bounded to the input -->

    <div v-if="$v.email.$error">
        <h3 v-if="!$v.email.email" class="errorMessage"> Please enter a valid email</h3>
        <h3 v-if="!$v.email.required" class="errorMessage">Email is required</h3>
    </div>

    <button :disabled="$v.$invalid"
            type="submit">
        Submit
    </button>
    <p v-if="$v.$anyError"
       class="errorMessage"> Please, fill out the required fields</p>
</form>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                email: null
            }
        },
        validations: {
            email: {
                required,
                email
            }
        },
        methods: {
            submit() {
                // set a dirty flag to true  on every single field
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    console.log('Form submitted: ', this.email)
                }

            }
        },
        name: "Example"
    }
</script>

<style scoped>

</style>
