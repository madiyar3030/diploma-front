<template>
    <div class="orders pt-4">
        <b-container>
            <b-row>
                <order-filter></order-filter>
                <div class="col-6">
                    <!-- <form>
                        <input type="text" placeholder="Поиск по заданиям">
                        <button>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.7099 20.2899L17.9999 16.6099C19.44 14.8143 20.1374 12.5352 19.9487 10.2412C19.76 7.94721 18.6996 5.81269 16.9854 4.27655C15.2713 2.74041 13.0337 1.91941 10.7328 1.98237C8.43194 2.04534 6.24263 2.98747 4.61505 4.61505C2.98747 6.24263 2.04534 8.43194 1.98237 10.7328C1.91941 13.0337 2.74041 15.2713 4.27655 16.9854C5.81269 18.6996 7.94721 19.76 10.2412 19.9487C12.5352 20.1374 14.8143 19.44 16.6099 17.9999L20.2899 21.6799C20.3829 21.7736 20.4935 21.848 20.6153 21.8988C20.7372 21.9496 20.8679 21.9757 20.9999 21.9757C21.1319 21.9757 21.2626 21.9496 21.3845 21.8988C21.5063 21.848 21.6169 21.7736 21.7099 21.6799C21.8901 21.4934 21.9909 21.2442 21.9909 20.9849C21.9909 20.7256 21.8901 20.4764 21.7099 20.2899ZM10.9999 17.9999C9.61544 17.9999 8.26206 17.5894 7.11091 16.8202C5.95977 16.051 5.06256 14.9578 4.53275 13.6787C4.00293 12.3996 3.86431 10.9921 4.13441 9.63427C4.4045 8.27641 5.07119 7.02912 6.05016 6.05016C7.02912 5.07119 8.27641 4.4045 9.63427 4.13441C10.9921 3.86431 12.3996 4.00293 13.6787 4.53275C14.9578 5.06256 16.051 5.95977 16.8202 7.11091C17.5894 8.26206 17.9999 9.61544 17.9999 10.9999C17.9999 12.8564 17.2624 14.6369 15.9497 15.9497C14.6369 17.2624 12.8564 17.9999 10.9999 17.9999Z" fill="#fff"/>
                            </svg>
                        </button>
                    </form> -->
                    <!-- <div class="tabs">
                        <div @click="activated(1)" :class="{active: active === 1}">Все</div>
                        <div @click="activated(2)" :class="{active: active === 2}">Физ. лица</div>
                        <div @click="activated(3)" :class="{active: active === 3}">Компании</div>
                    </div>
                    <div class="count">Найдено 234 исполнителей</div>
                    <div class="orders-order">
                        Сначала:
                        <div @click="ordered(1)" :class="{active: order === 1}">Дешевые</div>
                        <div @click="ordered(2)" :class="{active: order === 2}">Дорогие</div>
                        <div @click="ordered(3)" :class="{active: order === 3}">Новые</div>
                    </div> -->
                    <app-orders v-for="item in LISTS" :key="item.id" :order="item"></app-orders>
                </div>
                <div class="col-3 aside">
                    <aside>
                        <h3>Скачайте мобильное приложение</h3>
                        <p>Бесплатно, быстро, удобно</p>
                        <a href="#"><img src="@/assets/images/ios.png" alt=""></a><br>
                        <a href="#"><img src="@/assets/images/android.png" alt=""></a>
                    </aside>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import OrderFilter from '@/components/filter/'
    import AppOrders from '@/components/orders/'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                active: 1,
                order: 1
            }
        },
        computed: {
            ...mapGetters([
                'LISTS',
                'TOKEN'
            ])
        },
        methods: {
            activated(num) {
                this.active = num;
            },
            ordered(num) {
                this.order = num;
            }
        },
        components: {
            OrderFilter,
            AppOrders
        },
        created () {
            this.$store.dispatch('GET_LISTS', {
                page: 0,
                token: 'driver_token'
            });
        },
    }
</script>

<style scoped>
    aside{
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10% 1rem 10%;
    }
    form{
        width: 100%;
    }
    form input{
        max-width: calc(100% - 75px);
    }
    form button{
        background: #0069c4;
        border: 1px solid #0069c4;
        padding: 5px 1rem 3px;
        margin-left: 10px;
        border-radius: 4px;
    }
    .tabs{
        display: flex;
        margin-bottom: 3%;
    }
    .tabs > div{
        padding: 5px 15px;
        border: 1px solid #eee;
        margin-top: 4%;
        color: #0069c4;
        font-weight: bolder;
        cursor: pointer;
    }
    .tabs > div:nth-child(1){
        border-radius: 3px 0 0 3px;
    }
    .tabs > div:nth-child(3){
        border-radius: 0 3px 3px 0;
    }
    .tabs .active{
        background: #eeeeee;
        color: #000;
    }
    .count{
        color: #aeaeae;
        margin-bottom: 10px;
        font-size: 14px;
    }
    .orders-order{
        display: flex;
        font-size: 14px;
    }
    .orders-order > div{
        margin: 0;
        color: #0069c4;
        font-weight: bolder;
        padding: 0 10px;
    }
    .orders-order > div.active{
        background: #eee;
        color: #000;
        border-radius: 4px;
    }
    aside img{
        width: 150px;
        height: 40px;
    }
</style>