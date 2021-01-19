<template>
    <div class="app">
        <Search @search="search"/>
        <div class="sort pt-2 mb-2">
            <button class="btn btn-dark" type="button" @click="sortItems">По количеству библиотек <span :class="{invert:!this.sort.inverse}">↓</span></button>
        </div>
        <div class="app__item border mb-2" v-for="item in searchItems" :key="item.order">
            <router-link :to="{name: 'item', params: {id: item.order,item}}"> {{item.fullname}} {{item.libraries}}
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from "@/components/Search";

    export default {
        name: 'Home',
        components: {Search},
        data() {
            return {
                items: [],
                q: "",
                sort: {
                    "on": true,
                    inverse: true
                }
            }
        },
        created() {
            this.getItems();
        },
        computed: {
            searchItems() {
                if (this.q) {
                    return this.items.filter(item => item.fullname.toLowerCase().includes(this.q))
                } else if (this.sort.on) {
                    this.items.sort(function (a, b) {
                        if (a.libraries < b.libraries) {
                            return -1;
                        }
                        if (a.libraries > b.libraries) {
                            return 1;
                        }
                        return 0;
                    });
                    if (this.sort.inverse) {
                        this.items.reverse()
                    }
                    return this.items;
                } else {
                    return this.items;
                }
            }
        },
        methods: {
            getItems() {
                axios.get('/data.json')
                    .then(res => {
                        this.items = res.data;
                    })
            },
            search(value) {
                this.q = value;
            },
            sortItems() {
                this.sort.on = true;
                this.sort.inverse = !this.sort.inverse;
            }
        }
    }
</script>

<style lang="scss">
    .app{
        margin-left: auto;
        margin-right: auto;
        max-width: 700px;

        &__item{
            padding: 5px 0;
        }
    }
    .invert{
        display: inline-block;
        transform: rotate(180deg);
    }
</style>
