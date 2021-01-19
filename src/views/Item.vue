<template>
    <div class="item">
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

</template>

<script>
    export default {
        name: "Item",
        props: {
            item: {
                type: Object
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
