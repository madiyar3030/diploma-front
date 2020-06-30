<template> 
    <!-- Страница всех пользователей -->
    <div class="client">
        <client-header :profile="DRIVER"></client-header>
        <b-container class="mt-5">
            <b-row>
                <div class="col-md-9 col-lg-10 col-12">
                    <div class="about">
                        {{DRIVER.description}}
                        <hr>
                        <p class="p18">Название ИП</p>
                        {{DRIVER.ip || 'Не указан'}}
                        <hr>
                        <p class="p18">Документы</p>
                        {{DRIVER.passport || 'Не указан'}}
                        <hr>
                        <p class="p18">Техника</p>
                        <div
                            class="cars"
                            v-for="item in DRIVER.cars"
                            :key="item.id"
                        >   
                            <b-container>
                                <div class="flex">
                                    <figure v-if="item.images && item.images.length > 0">
                                        <img :src="url + item.images[0].path" alt="">
                                        <!-- <img src="@/assets/images/profile.jpg" alt=""> -->
                                    </figure>
                                    <div>
                                        <p class="mb-0">{{item.name}}</p>
                                        {{item.info}}
                                    </div>
                                </div>
                                <b-row>
                                    <div class="col-md-6 col-12">ГОС номер</div>
                                    <div class="col-md-6 col-12 text-right">{{item.number}}</div>
                                </b-row>
                                <b-row>
                                    <div class="col-md-6 col-12">Тип транспорта</div>
                                    <div v-if="item.car_transports && item.car_transports.length > 0" class="col-md-6 col-12 text-right">
                                        {{item.car_transports[0].name}}
                                    </div>
                                </b-row>
                            </b-container>
                            <hr>
                            <!-- <b-row>
                                <div class="col-md-6 col-12">Грузоподъемность кузова</div>
                                <div class="col-md-6 col-12">{{item.number}}</div>
                            </b-row> -->
                        </div>
                        <div v-if="DRIVER.cars && DRIVER.cars.length === 0">
                            Техники не добавлены
                            <hr>
                        </div>
                        <p class="p18">Отзывы</p>
                        <div v-if="TYPE === 'client'" class="add-review">
                            <div class="stars">
                                <div @mouseover="addReviewStarRating(item)" v-for="(item, index) in reviewStarRating" :key="index">
                                    <svg v-if="starRating >= item" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.14168 0.521791L5.18879 4.40022L0.819452 5.02416C0.035902 5.13548 -0.278116 6.08165 0.290107 6.62358L3.45122 9.64078L2.70356 13.9029C2.56898 14.6734 3.39739 15.2504 4.09122 14.8901L8 12.8777L11.9088 14.8901C12.6026 15.2475 13.431 14.6734 13.2964 13.9029L12.5488 9.64078L15.7099 6.62358C16.2781 6.08165 15.9641 5.13548 15.1805 5.02416L10.8112 4.40022L8.85832 0.521791C8.50841 -0.16953 7.49458 -0.178317 7.14168 0.521791Z" fill="#FFCF55"/>
                                    </svg>
                                    <svg v-if="starRating < item" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path d="M15.1805 5.02416L10.8112 4.40022L8.85832 0.521791C8.50841 -0.16953 7.49458 -0.178317 7.14168 0.521791L5.18879 4.40022L0.819452 5.02416C0.035902 5.13548 -0.278116 6.08165 0.290107 6.62358L3.45122 9.64078L2.70356 13.9029C2.56898 14.6734 3.39739 15.2504 4.09122 14.8901L8 12.8777L11.9088 14.8901C12.6026 15.2475 13.431 14.6734 13.2964 13.9029L12.5488 9.64078L15.7099 6.62358C16.2781 6.08165 15.9641 5.13548 15.1805 5.02416ZM11.0086 9.14865L11.7174 13.2028L8 11.29L4.28262 13.2028L4.99141 9.14865L1.98281 6.27792L6.13982 5.68619L8 1.99524L9.86018 5.68619L14.0172 6.27792L11.0086 9.14865Z" fill="#CED4DA"/>
                                    </svg>
                                </div>
                            </div>
                            <textarea v-model="text" placeholder="Ваш отзыв..." name="" id=""></textarea>
                        </div>
                        <button @click="sendReview()" v-if="text !== ''">Отправить</button>
                        <div class="reviews">
                            <reviews v-for="item in DRIVER.reviews" :key="item.id" :review="item"></reviews>
                        </div>
                        <div v-if="DRIVER.reviews && DRIVER.reviews.length === 0">
                            Нет отзывов
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-lg-2 col-12">
                    <button v-if="client && client === 'true'" @click="start()" class="mb-5">Начать работу</button>
                    <button v-if="TYPE === 'client'" @click="send()" class="mb-5">Написать</button>
                    <p class="p18">Контакты</p>
                    <!-- <p>Скрыто</p> -->
                    <p>{{DRIVER.phone || 'Скрыто'}}</p>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ClientHeader from '@/components/profile/Header'
    import Reviews from '@/components/reviews/'
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
        props: {
            id: {
                type: String,
            },
            offer_id: {
                type: String
            },
            type: {
                type: String
            },
            client: {
                type: String
            }
        },
        data() {
            return {
                reviewStarRating: [1, 2, 3, 4, 5],
                starRating: 0,
                text: '',
                url: 'http://37.46.133.192/',
            }
        },
        computed: {
            ...mapGetters([
                'DRIVER',
                'TOKEN',
                'TYPE'
            ])
        },
        methods: {
            addReviewStarRating(index){
                this.starRating = index
            },
            async start(){
                let url;
                if(this.type === 'service_orders') url = '/order/service/accept';
                else if(this.type === 'shipping_orders') url = '/order/shipping/accept';
                else if(this.type === 'item_orders') url = '/order/item/accept';
                await api.post(url, {
                    token: this.TOKEN,
                    offer_id: this.offer_id
                })
            },
            async send(){
                await api.post('/client/create/chat', {
                    token: this.TOKEN,
                    driver_id: this.id
                })
                .then(response => {
                    console.log(response)
                    this.$router.push('/chats/0/0')
                })
                .catch(e => console.log(e.response))
            },
            async sendReview(){
                await api.post('/review/create', {
                    token: this.TOKEN,
                    driver_id: this.id,
                    speed: this.starRating,
                    punctuality: this.starRating,
                    quality: this.starRating,
                    price: this.starRating,
                    description: this.text
                })
                .then(response => {
                    console.log(response)
                    this.$store.dispatch('GET_DRIVER', this.id);
                    this.starRating = 0,
                    this.text = ''
                    this.makeToast('success');
                })
                .catch(e => {
                    console.log(e.response)
                    this.makeToast('danger', 'Ошибка');
                })
            }
        },
        components: {
            ClientHeader,
            Reviews
        },
        created () {
            this.$store.dispatch('GET_DRIVER', this.id);
        },
    }
</script>

<style scoped>
    button{
        background: #ffc525;
        color: #000;
        border: 1px solid #ffc525;
        width: 100%;
        font-weight: bolder;
        padding: 7px 0;
        border-radius: 4px;
    }
    .p18{
        font-weight: 500;
    }
    .reviews{
        margin-top: 2rem;
    }
    .reviews > div:not(:last-child){
        border-bottom: 1px solid #eee;
        margin-bottom: 1.5rem;
    }
    textarea{
        width: 100%;
        max-width: 100%;
        min-height: 50px;
        border: none;
        outline: none;
        font-size: 14px;
    }
    .add-review{
        border: 1px solid #eee;
    }
    .add-review .stars{
        margin-left: 20px;
        display: flex;
    }
    .add-review svg{
        margin-right: 5px;
        cursor: pointer;
    }
    .add-review ~ button{
        background: #fff;
        color: #0069c4;
    }
    img{
        max-width: 100px;
    }
    .cars .flex{
        justify-content: flex-start;
    }
    .cars .flex > figure{
        margin-right: 10px;
    }
</style>