<template>
    <div>
        <Preloader v-if="loading"/>
        <div class="item" v-if="item">
            <h1>{{item.fullname}}</h1>
            <div class="item__row border p-2">
                <div class="item__prop">Адрес</div>
                <div class="item__value">{{item.address}}</div>
            </div>
            <div class="item__row border p-2">
                <div class="item__prop">Территория</div>
                <div class="item__value">{{item.territory}}</div>
            </div>
            <div class="item__row border p-2">
                <div class="item__prop">Количество библиотек</div>
                <div class="item__value">{{item.libraries}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Preloader from '@/components/Preloader';

    export default {
        name: "Item",
        components: {Preloader},
        data() {
            return {
                item: null,
                loading: true,
            }
        },
        created() {
            this.getItem();
        },
        methods: {
            getItem() {
                axios.get('/data.json')
                    .then(res => {
                        this.item = res.data.filter(item => {
                            return item.order === Number(this.$route.params.id)
                        })[0];
                        this.loading = false;
                    })
            }
        }
    }
</script>

<style lang="scss">
    .item {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;

        &__row {
            display: flex;
            margin-bottom: 10px;
        }

        &__prop {
            margin-right: 5px;

            &:after {
                display: inline-block;
                content: ":";
            }
        }
    }
</style>
