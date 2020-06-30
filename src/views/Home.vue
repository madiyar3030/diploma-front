<template>
    <div class="home">
        <app-banner></app-banner>
        <b-container>
            <p class="mt-5"><strong>Новые заказы</strong></p>
            <b-row>
                <div class="col-9">
                    <main-orders v-for="item in LISTS" :key="item.id" :order="item"></main-orders>
                    <router-link to="/orders" tag="div" class="new-orders">
                        Все новые заказы <span>1232</span>
                    </router-link>
                </div>
                <div class="col-3">
                    <aside>
                        <h3>Разместить новый заказ</h3>
                        <p>Опубликавать в разделе:</p>
                        <select v-model="order">
                            <option disabled value="null">Выберите раздел</option>
                            <option value="service">Услуги спец. техники</option>
                            <option value="transport">Перевозка грузов</option>
                            <option value="material">Материалы с доставкой</option>
                        </select>
                        <button :disabled="order === null"  @click="open()">Продолжить</button>
                        <div class="text-center">
                            <small>Бесплатно, легко и быстро</small>
                        </div>
                    </aside>
                </div>
            </b-row>
            <p class="mt-5"><strong>Находите исполнителей в категориях</strong></p>
            <b-row class="cats mb-5">
                <div class="col-3">
                    <div>Авто услуги</div>
                    <div>Образование и курсы</div>
                    <div>Персонал</div>
                    <div>Медицинские услуги и здоровье</div>
                    <div>Мероприятие</div>
                </div>
                <div class="col-3">
                    <div>Красота</div>
                    <div>Деловые услуги</div>
                    <div>IT и маркетинг</div>
                    <div>Дизайн и искусства</div>
                    <div>Строительства</div>
                </div>
                <div class="col-3">
                    <div>Фото, видео и аудио</div>
                    <div>Доставка и перевозка</div>
                    <div>Другое</div>
                </div>
                <div class="col-3">
                    <div>Фото, видео и аудио</div>
                    <div>Доставка и перевозка</div>
                    <div>Другое</div>
                </div>
            </b-row>
        </b-container>
        <div class="download">
            <b-container>
                <h2 class="mb-0">Скачайте мобильное приложение</h2>
                <p>Бесплатно, быстро, удобно</p>
                <div>
                    <a href="#" style="margin-right: 10px;"><img src="@/assets/images/ios.png" alt=""></a>
                    <a href="#"><img src="@/assets/images/android.png" alt=""></a>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
    import AppBanner from '@/components/banner/'
    import MainOrders from '@/components/orders/'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                order: null
            }
        },
        computed: {
            ...mapGetters([
                'LISTS',
                'TYPE'
            ]),
            // lists(){
            //     let list = [];
            //     for (let i = 0; i < 3 || this.LISTS.length; i++) {
            //         list.push(this.LISTS[i]);
            //     }
            //     console.log(list)
            //     return list;
            // }
        },
        methods: {
            open() {
                if(this.TYPE === 'client'){
                    this.$router.push({name: 'new-order', params: {name: this.order}})
                }
                else{
                    if(this.TYPE === 'driver') alert('Вы должны быть клиентом!')
                    else alert('Вы должны авторизованы!')
                }
            }
        },
        components: {
            AppBanner,
            MainOrders
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
    .home{

    }
    aside{
        padding: 5% 20px 15%;
        background: #f9f9f9;
        border-radius: 5px;
        height: 100%;
    }
    select, button{
        width: 100%;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    button{
        background: #ffc525;
        border: 2px solid #ffc525;
        padding: 5px 0;
    }
    button:disabled{
        cursor: not-allowed;
    }
    .new-orders{
        color: #0069c4;
        text-align: center;
        padding: 10px 0;
        border: 1px solid #d8d8d8;
        border-top: none;
        cursor: pointer;
    }
    .new-orders span{
        color: #b2b2b2;
    }
    .cats > div > div{
        color: #0069c4;
        font-size: 14px;
        cursor: pointer;
        font-weight: bolder;
    }
    .download{
        background: #f5f5f5;
        padding: 3%;
        margin-top: 5%;
        margin-bottom: -30px;
    }
    .download img{
        width: 100px;
        height: 30px;
    }
</style>