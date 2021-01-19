<template>
    <div class="app">
        <Preloader v-if="loading"/>
        <div v-if="items.length">
            <Search @search="search"/>
            <div class="sort pt-2 mb-2">
                <button class="btn btn-dark" type="button" @click="sort('libraries')">Сортировать по количеству
                    библиотек
                    <span class="arrow"
                          v-if="currentSort==='stargazers_count'"
                          :class="activeSortClass">↓</span>
                </button>
            </div>
            <div class="app__item border mb-2" v-for="item in searchItems" :key="item.order">
                <router-link :to="{name: 'item', params: {id: item.order}}"> {{item.fullname}} {{item.libraries}}
                </router-link>
            </div>
            <nav aria-label="Page navigation"
                 v-if="searchItems.length>=size || pageNumber===pageCount -1 && pageNumber!==0">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button class='page-link' :disabled="pageNumber===0" @click="prevPage">Previous</button>
                    </li>
                    <li class="page-item">
                        <button @click="nextPage" :disabled="pageNumber >= pageCount -1" class='page-link'>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from "@/components/Search";
    import Preloader from '@/components/Preloader';

    export default {
        name: 'Home',
        components: {Search, Preloader},
        data() {
            return {
                items: [],
                q: "",
                loading: true,
                currentSort: 'libraries',
                currentSortDir: 'desc',
                size: 10,
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
                    return this.items.filter(item => item.fullname.toLowerCase().includes(this.q)).slice(start, end)
                        .sort((a, b) => {
                            let mod = 1;
                            if (this.currentSortDir === 'desc') mod = -1;
                            if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
                            if (a[this.currentSort] > b[this.currentSort]) return mod;
                            return 0;
                        });
                } else {
                    return this.items.slice(start, end).sort((a, b) => {
                        let mod = 1;
                        if (this.currentSortDir === 'desc') mod = -1;
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
                        if (a[this.currentSort] > b[this.currentSort]) return mod;
                        return 0;
                    });
                }
            },
            pageCount() {
                let l = this.items.length,
                    s = this.size;
                return Math.ceil(l / s);
            }
        },
        methods: {
            getItems() {
                axios.get('/data.json')
                    .then(res => {
                        this.items = res.data;
                        this.loading = false;
                    })
            },
            search(value) {
                this.pageNumber = 0;
                this.q = value;
            },
            activeSortClass() {
                return {
                    'desc': this.currentSortDir === 'desc'
                }
            },
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                this.pageNumber--;
            },
            sort(name) {
                if (name === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = name
            },
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

    .arrow {
        display: inline-block;

        &.desc {
            transform: rotate(180deg);
        }
    }

</style>
