<template>
    <div class="subcontent"></div>
</template>

<script>
export default {
    name: 'ContentBody',
    props: {
        render: {
            required: true,
        },
    },
    data() {
        return { }
    },
    async mounted() {
        document.querySelector(".subcontent").innerHTML = await this.render;
    }
}
</script>

<style lang="scss"></style>