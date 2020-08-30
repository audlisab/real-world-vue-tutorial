<template>
    <div>
        <label v-if="label"> {{ label }}</label>
        <select
                v-bind="$attrs"
                v-on="$listeners"
                :value="value"
                @input="updateValue">
        <option
                v-for="option in options"
                :key="option"
                :value="option"
                :selected="option === value">
            {{ option }}
        </option>
        </select>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            options: {
                type: Array,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            value: [String, Number]
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        },
        name: "BaseSelect"
    }
</script>

<style scoped>

</style>
