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
    import {formFieldMixin} from "../mixins/formFieldMixin";

    export default {
        mixins: [formFieldMixin],
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
        name: "BaseInput"
    }
</script>

<style scoped>

</style>
