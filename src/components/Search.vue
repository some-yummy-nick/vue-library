<template>
    <div class="search">
        <input class="form-control" type="search" @input="changed">
    </div>
</template>

<script>
    export default {
        name: "Search",
        methods:{
            changed(e){
                this.$emit('search', e.currentTarget.value.toLowerCase());
            }
        }
    }
</script>

<style>
.search{
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
}
</style>
