<template>
    <div>
        <h1> Oh-oh!</h1>
        <h3> It looks like you're experiencing some network issues. </h3>
    <router-link :to="{ name: 'event-list'}">Back to home</router-link>
    </div>
</template>

<script>
    export default {
        name: "NetworkIssue"
    }
</script>

<style scoped>

</style>
