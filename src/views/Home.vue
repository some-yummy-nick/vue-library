<template>
    <div class="app">
        <Search @search="search"/>
        <div class="sort pt-2 mb-2">
            <button class="btn btn-dark" type="button" @click="sortItems">По количеству библиотек <span
                    :class="{invert:!this.sort.inverse}">↓</span></button>
        </div>
        <div class="app__item border mb-2" v-for="item in searchItems" :key="item.order">
            <router-link :to="{name: 'item', params: {id: item.order}}"> {{item.fullname}} {{item.libraries}}
            </router-link>
        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" >
                    <button class='page-link' :disabled="pageNumber===0" @click="prevPage">Previous</button>
                </li>
                <li class="page-item">
                    <button @click="nextPage" :disabled="pageNumber >= pageCount -1"  class='page-link'>Next</button>
                </li>
            </ul>
        </nav>
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
                },
                size:10,
                pageNumber: 0
            }
        },
        created() {
            this.getItems();
        },
        computed: {
            searchItems() {
                const start = this.pageNumber * this.size,
                    end = start + this.size;
                if (this.q) {
                    return this.items.filter(item => item.fullname.toLowerCase().includes(this.q)).slice(start, end);
                } else if (this.sort.on) {
                    this.items.sort(function (a, b) {
                        if (a.libraries < b.libraries) {
                            return -1;
                        }
                        if (a.libraries > b.libraries) {
                            return 1;
                        }
                        return 0;
                    }).slice(start, end);
                    if (this.sort.inverse) {
                        this.items.reverse().slice(start, end);
                    }
                    return this.items.slice(start, end);
                } else {
                    return this.items.slice(start, end);
                }
            },
            pageCount(){
                let l = this.items.length,
                    s = this.size;
                return Math.ceil(l/s);
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
            },
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                this.pageNumber--;
            }
        }
    }
</script>

<style lang="scss">
    .app {
        margin-left: auto;
        margin-right: auto;
        max-width: 700px;

        &__item {
            padding: 5px 0;
        }
    }

    .invert {
        display: inline-block;
        transform: rotate(180deg);
    }

</style>
