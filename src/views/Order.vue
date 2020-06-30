<template>
    <div class="order">
        <b-container v-if="ORDER">
            <b-row>
                <div class="col-9">
                    <h3>{{types()}}</h3>
                    <p class="p18 date">
                        <span v-if="ORDER.hour">{{ORDER.hour.slice(0, 16)}}</span>
                        <!-- <span>{{ORDER.date_1}}</span> -->
                        &middot;
                        <span>Алматы, {{ORDER.from}}</span>
                    </p>
                    <p>
                        {{ORDER.description}}
                    </p>
                    <b-row>
                        <div class="col-md-6 col-12 info">
                            <!--            SERVICE  | SHIPPING                   -->
                            <div v-if="ORDER.transport" class="flex">
                                <p>Транспорт</p>
                                <p>{{ORDER.transport.name}}</p>
                            </div>
                            <!--            SERVICE                          -->
                            <div v-if="ORDER.transport_type" class="flex">
                                <p>Тип транспорт</p>
                                <p>{{ORDER.transport_type.name}}</p>
                            </div>
                            <div v-if="ORDER.material" class="flex">
                                <p>Материал</p>
                                <p>{{ORDER.material.name}}</p>
                            </div>
                            <div v-if="ORDER.material_type" class="flex">
                                <p>Тип материала</p>
                                <p>{{ORDER.material_type.name}}</p>
                            </div>
                            <div v-if="ORDER.count_type" class="flex">
                                <p>Количество</p>
                                <p>{{ORDER.count}} {{ORDER.count_type.name}}</p>
                            </div>
                        </div>
                    </b-row>
                    <div class="images" v-if="ORDER.images && ORDER.images.length > 0">
                        <figure v-for="item in ORDER.images" :key="item.id">
                            <img :src="item.path" alt="">
                        </figure>
                    </div>
                    <b-row>
                        <div class="col-md-6 col-12 info">
                            <div v-if="ORDER.from_city" class="flex">
                                <p>Адрес откуда:</p>
                                <p>
                                    <span>г.{{ORDER.from_city.name}} </span>
                                    <span>{{ORDER.from}}</span>
                                </p>
                            </div>
                            <!-- <div v-if="ORDER.to_address" class="flex">
                                <p>Адрес куда:</p>
                                <p>{{ORDER.to_address.text}}</p>
                            </div> -->
                            <div v-for="(item, index) in ORDER.to" :key="index" class="flex">
                                <p>Адрес куда:</p>
                                <p>
                                    <span>г.{{item.name}} </span>
                                    <span>{{item.to}}</span>
                                </p>
                            </div>
                            <div v-if="ORDER.to_address" class="flex">
                                <p>Адрес куда:</p>
                                <p>
                                    <span>{{ORDER.to_address.text}} </span>
                                </p>
                            </div>
                        </div>
                    </b-row>
                    <GmapMap
                        v-if="ORDER.to_address && ORDER.to_address.lat && ORDER.to_address.lng"
                        :center="{lat: parseFloat(ORDER.to_address.lat), lng: parseFloat(ORDER.to_address.lng)}"
                        :zoom="15"
                        map-type-id="terrain"
                        style="width: 100%; height: 300px; margin: 20px 0 4rem;"
                    >
                        <GmapMarker
                            :position="{lat: parseFloat(ORDER.to_address.lat), lng: parseFloat(ORDER.to_address.lng)}"
                        />
                    </GmapMap>
                    <p v-if="ORDER.drivers && ORDER.drivers.length > 0"><strong>Исполнитель</strong></p>
                    <div 
                        v-for="item in ORDER.drivers" 
                        :key="item.id"
                    >
                        <profile-info 
                            :profile="item"
                        ></profile-info>
                    </div>
                </div>
                <div class="col-3 about-order">
                    <div class="about">
                        <h4>
                            <span v-if="ORDER.step !== 3">Заказ открыт</span>
                            <span v-if="ORDER.step === 3">Заказ закрыт</span>
                        </h4>
                        <small v-if="ORDER.date">{{ORDER.date.slice(0, 16)}}</small>
                    </div>
                    <div class="price">
                        <h4>{{ORDER.price}} тг</h4>
                        <small>Вознаграждение</small>
                        <hr>
                        <h4>{{ORDER.count_offers}}</h4>
                        <small>Откликнувшихся</small>                        
                    </div>
                    <div v-if="TYPE === 'client' && API_TOKEN.id === ORDER.client_id && ORDER.step !== 3">
                        <button @click="cancel()" class="closeBtn">Завершить</button>
                        <small v-if="edit">Цена</small>
                        <input v-if="edit" type="text" class="mb-2 text-center" v-model="ORDER.price">
                        <button @click="editApi()" class="editBtn">Редактировать</button>
                    </div>
                    <div v-if="TYPE === 'driver' && ORDER.drivers && ORDER.drivers.length === 0" class="text-center">
                        <small>Ваша цена</small>
                        <input v-model="price" class="mb-3 text-center" type="text" placeholder="Напишите цену">
                        <button @click="create()" class="closeBtn">Отликнуться</button>
                    </div>
                </div>
            </b-row>
        </b-container>
        <div class="executors">
            <b-container>
                <b-row>
                    <div class="col-9">
                        <p v-if="OFFERS.length > 0"><strong>Откликнувшиеся</strong></p>
                        <div v-for="item in OFFERS" :key="item.id">
                            <profile-info :client="API_TOKEN.id === ORDER.client_id" @accept="accepted" :profile="item"></profile-info>
                            <hr>
                        </div>
                        <!-- <profile-info></profile-info>
                        <hr> -->
                    </div>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import ProfileInfo from '@/components/profile/Info'
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
        props: {
            id: {
                type: String,
                default: '1'
            },
            type: {
                type: String
            }
        },
        data() {
            return {
                url: 'http://37.46.133.192',
                price: '',
                markers: [],
                center: { lat: 43.245324, lng: 76.937071 },
                lat: 43.245324,
                lng: 76.937071,
                edit: false,

            }
        },
        computed: {
            ...mapGetters([
                'ORDER',
                'OFFERS',
                'TOKEN',
                'TYPE',
                'API_TOKEN'
            ])
        },
        methods: {
            async cancel() {
                let url = '';
                await api.post('/order/' + this.type + '/end', {
                    token: 'token',
                    order_id: this.id
                })
                .then(response => {
                    console.log(response);
                    if(this.ORDER.driver && this.ORDER.driver.length > 0)
                        this.$router.push({name: 'reviews', params: {id: this.ORDER.driver[0].id}})
                })
                .catch(e => {
                    console.log(e.response)
                    if(this.ORDER.drivers && this.ORDER.drivers.length > 0)
                        this.$router.push({name: 'reviews', params: {id: this.ORDER.drivers[0].id}})
                })
            },
            async editApi(){
                console.log(this.edit)
                if(this.edit === true){
                    let url = '';
                    await api.post('/order/' + this.type + '/price', {
                        token: this.TOKEN,
                        order_id: this.id,
                        price: this.ORDER.price
                    })
                    .then(response => {
                        console.log(response);
                        this.edit = false
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                }
                else{
                    this.edit = true
                }
            },
            async create(){
                let url = '';
                await api.post('/order/' + this.type + '/offer/create', {
                    token: this.TOKEN,
                    order_id: this.id,
                    price: this.price,
                    description: 'asdjhdkjs'
                })
                .then(response => {
                    console.log(response.data);
                    this.$store.dispatch('GET_ORDER', {
                        id: this.id,
                        type: this.type
                    });
                    this.$store.dispatch('GET_OFFERS', {
                        id: this.id,
                        type: this.type
                    });
                    if(response.data && response.data.statusCode === 402){
                        alert(response.data.message)
                    }
                    else if(response.data && response.data.statusCode === 401){
                        alert('Ваше предложение существует')
                    }
                })
                .catch(e => {
                    console.log(e.response)
                })
            },
            async accepted(data){
                let url = '';                
                await api.post('/order/' + this.type + '/accept', {
                    token: this.TOKEN,
                    offer_id: data,
                })
                .then(response => {
                    console.log(response);
                    this.$store.dispatch('GET_ORDER', {
                        id: this.id,
                        type: this.type
                    });
                    this.$store.dispatch('GET_OFFERS', {
                        id: this.id,
                        type: this.type
                    });
                })
                .catch(e => {
                    console.log(e.response)
                })
            },
            types(){
                let type = this.$route.params.type
                if(type === 'item') return 'Материалы с доставкой'
                else if(type === 'shipping') return 'Перевозка грузов'
                else if(type === 'service') return 'Услуги спец.техники'
            },
        },
        components: {
            ProfileInfo,
        },
        created () {
            this.$store.dispatch('GET_ORDER', {
                id: this.id,
                type: this.type
            });
            this.$store.dispatch('GET_OFFERS', {
                id: this.id,
                type: this.type
            });
        },
    }
</script>

<style scoped>
    .order{
        background: #f7f7f7;
    }
    h3{
        margin-top: 5%;
    }
    .images{
        display: grid;
        grid-template-columns: repeat(3, 30%);
        grid-gap: 10px 4%;
    }
    .images img{
        max-width: 100%;
    }
    .about-order{
        margin-top: 4%;
    }
    .about-order .about, .about-order .price{
        text-align: center;
        border: 1px solid #e5e5e5;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 0 15px 10px;
    }
    .about-order h4{
        margin: 10px 0 0;
    }
    .about-order .about h4{
        color: #4abe64;
    }
    .about-order .price h4{
        color: #2d84cf;
    }
    .about-order button{
        width: 100%;
        margin-bottom: 10px;
        padding: 10px 0;
        border-radius: 4px;
        font-weight: bold;
    }
    .about-order .closeBtn{
        background: #ffc525;
        border: 1px solid #ffc525;
        color: #000;
    }
    .about-order .editBtn{
        border: 1px solid #dddddd;
        background: #fff;
        color: #0069c4;
    }
    .executors{
        background: #fff;
        margin-top: 2%;
        padding-top: 2%;
    }
    .info .flex:not(:last-child){
        border-bottom: 1px solid #aaa;
        margin-bottom: 3%;
    }
</style>