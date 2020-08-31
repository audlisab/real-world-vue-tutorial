<template>
    <div>
        <label v-if="label"> {{ label }}</label>
        <select
                v-bind="$attrs"
                v-on="$listeners"
                :value="value"
                @change="updateValue">
        <option
                v-for="option in options"
                :key="option.id"
                :value="option"
                :selected="option === value">
            {{ option }}
        </option>
        </select>
    </div>
</template>

<script>
    import {formFieldMixin} from "../mixins/formFieldMixin";

    export default {
        mixins: [formFieldMixin],
        props: {
            options: {
                type: Array,
                required: true
            }
        },
        name: "BaseSelect"
    }
</script>

<style scoped>

</style>
