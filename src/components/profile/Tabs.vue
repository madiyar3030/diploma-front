<template>
    <div class="tabs">
        <ul>
            <li @click="open('profile-about')" :class="{active: $route.params.name === 'profile-about'}">О себе</li>
            <li @click="open('profile-orders')" :class="{active: $route.params.name === 'profile-orders'}">Активные заявки</li>
            <li v-if="TYPE === 'client'" @click="open('profile-reviews')" :class="{active: $route.params.name === 'profile-reviews'}">Отзывы</li>
            <li v-if="TYPE === 'driver'" @click="open('profile-transport')" :class="{active: $route.params.name === 'profile-transport'}">Транспорты</li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    export default {
        computed: {
            ...mapGetters([
                'TYPE'
            ])
        },
        methods: {
            open(a) {
                if(this.$route.params.name !== a)
                    this.$router.push({name: 'profile-name', params: {name: a}})
            }
        },
    }
</script>

<style scoped>
    ul{
        display: flex;
        padding-left: 0;
        border-bottom: 1px solid #eee;
    }
    li{
        list-style: none;
        margin-right: 2rem;
        padding-bottom: 15px;
        font-weight: bolder;
        cursor: pointer;
        border-bottom: 2px solid rgba(0, 0, 0, 0);
    }
    li.active{
        border-bottom: 2px solid rgb(255, 217, 0);
    }
    span{
        color: #aaa;
    }
</style>