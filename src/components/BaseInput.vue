<template>
    <div>
        <label v-if="label"> {{ label }}</label>
        <input v-bind="$attrs"
               v-on="listeners"
               :value="value"
               @input="updateValue"/>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            value: [String, Number]
        },
        computed: {
            // listener conflict resolution
          listeners() {
            return {
                ...this.$listeners,
                // the one that takes precedence as the one lower down
                input: this.updateValue
            }
          }
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        },
        name: "BaseInput"
    }
</script>

<style scoped>

</style>
