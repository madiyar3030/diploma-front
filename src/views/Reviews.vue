<template>
    <div class="reviews">
        <b-container>
            <h2>Остановить отзыв</h2>
            <p>Ваши данные</p>
            <b-row>
                <div class="col-3">
                    Оценка за скорость работы
                </div>
                <div class="col-9 radioBtn">
                    <label v-for="item in 5" :key="item">
                        <input :value="item" v-model="speed" type="radio" name="speed">{{item}}
                    </label>
                </div>
            </b-row>
            <b-row>
                <div class="col-3">
                    Оценка за пунктуальность
                </div>
                <div class="col-9 radioBtn">
                    <label v-for="item in 5" :key="item">
                        <input :value="item" v-model="punctuality" type="radio" name="punctuality">{{item}}
                    </label>
                </div>
            </b-row>
            <b-row>
                <div class="col-3">
                    Оценка за качество работы
                </div>
                <div class="col-9 radioBtn">
                    <label v-for="item in 5" :key="item">
                        <input :value="item" v-model="quality" type="radio" name="quality">{{item}}
                    </label>
                </div>
            </b-row>
            <b-row>
                <div class="col-3">
                    Оценка за цену
                </div>
                <div class="col-9 radioBtn">
                    <label v-for="item in 5" :key="item">
                        <input :value="item" v-model="price" type="radio" name="price">{{item}}
                    </label>
                </div>
            </b-row>
            <p class="mt-5">Комментарий</p>
            <textarea v-model="description" placeholder="Напишите комментарий"></textarea><br>
            <button @click="send()" class="blueBtn mt-4 mb-5">Отправить</button>
        </b-container>
    </div>
</template>

<script>
    import api from '@/help/api'
    import { mapGetters } from 'vuex'
    export default {
        props: {
            id: {
                type: String,
                default: '1'
            },
        },
        data() {
            return {
                speed: '5',
                punctuality: '5',
                quality: '5',
                price: '5',
                description: ''
            }
        },
        computed: {
            ...mapGetters([
                'TOKEN'
            ])
        },
        methods: {
            async send() {
                await api.post('/review/create', {
                    token: this.TOKEN , 
                    driver_id: this.id , 
                    speed: this.speed , 
                    punctuality: this.punctuality , 
                    quality: this.quality , 
                    price: this.price , 
                    description: this.description , 
                })
                .then(response => {
                    console.log(response)
                    // if(this.response.data.statusCode === 200){
                        this.$router.push('/');
                        this.makeToast('success');
                    // }
                })
            }
        },
    }
</script>

<style scoped>
    label{
        display: flex;
        margin-right: 2rem;
        cursor: pointer;
    }
    .radioBtn{
        display: flex;
    }
    input[type="radio"]{
        width: 10px;
        margin-top: 7px;
        margin-right: 5px;
    }
    input[type="radio"]:checked, input[type="radio"]:checked ~ label{
        color: #0069c4;
    }
    .row{
        margin-bottom: 20px;
    }
    p{
        font-weight: bold;
    }
    h2{
        margin: 3% 0 ;
    }
</style>