<template>
    <div class="profile-orders">
        <b-container>
            <div class="cash flex mb-4">
                <p class="mb-0">
                    <span v-if="TYPE === 'client'">Кешбэк</span>
                    <span v-if="TYPE === 'driver'">Бонус</span>
                    <span v-if="API_TOKEN.cash_back" class="price pl-3">{{API_TOKEN.cash_back || 0}}</span>
                    <span v-if="API_TOKEN.bonus" class="price pl-3">{{API_TOKEN.bonus || 0}}</span>
                </p>
                <a :disabled="TOKEN.cash_back === 0">Потратить 
                    <span v-if="API_TOKEN.cash_back">кешбэк</span>
                    <span v-if="API_TOKEN.bonus">бокус</span>
                </a>
            </div>
            <tabs></tabs>
            <app-orders v-for="item in ACTIVE" :key="item.id" :order="item"></app-orders>
        </b-container>
    </div>
</template>

<script>
    import Tabs from './Tabs'
    import { mapGetters } from 'vuex'
    import AppOrders from '@/components/orders/'
    export default {
        computed: {
            ...mapGetters([
                'API_TOKEN',
                'TOKEN',
                'ACTIVE',
                'TYPE'
            ])
        },
        components: {
            Tabs,
            AppOrders
        },
        created () {
            this.$store.dispatch('GET_ACTIVE', {
                type: this.TYPE,
                token: this.TOKEN,
                page: 0
            })
        },
    }
</script>

<style scoped>
    .profile-orders{
        padding-top: 4%;
    }
    .cash{
        border: 1px solid #eee;
        padding: 7px 15px;
        align-items: center;
    }
    .cash p{
        font-weight: bolder;
    }
    .cash .price{
        font-size: 20px;
        color: rgb(255, 217, 0);
    }
    .cash a{
        font-size: 12px;
        color: skyblue;
        text-decoration: underline;
        cursor: pointer;
    }
    a:disabled{
        cursor: not-allowed;
    }
</style>