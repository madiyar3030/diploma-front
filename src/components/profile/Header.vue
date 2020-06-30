<template>
    <div class="profile-header">
        <b-container>
            <b-row v-if="profile">
                <div class="col-3 avatar">
                    <figure>
                        <img v-if="profile.avatar !== null && profile.avatar && image === ''" :src="url + profile.avatar" alt="">
                        <img v-if="profile.avatar === null && image === ''" src="@/assets/images/profile.jpg" alt="">
                        <img v-if="image !== ''" :src="image" alt="">
                        <!-- <img src="@/assets/images/profile.jpg" alt=""> -->
                        <input title="Изменить аватар" @change="fileChangeHandler" type="file">
                    </figure>
                </div>
                <div class="col-6">
                    <!-- <p class="name">Имя и фамилия</p> -->
                    <p class="name">{{profile.name}}</p>
                    <div class="flex">
                        <div>
                            <small>На сервисе</small><br>
                            <span>c {{profile.created_at}}</span>
                        </div>
                        <div v-if="TYPE === 'driver'">
                            <small>Работал</small><br>
                            <span>{{profile.ball}} час</span>
                        </div>
                        <div>
                            <small>Звание</small><br>
                            <span v-if="profile.rang">{{profile.rang.name}}</span>
                        </div>
                    </div>
                    <p v-if="TYPE === 'driver'" class="rating">
                        <svg style="margin-right: 10px;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.08822 0.721634L6.01055 4.84786L1.36204 5.51167C0.52843 5.6301 0.194349 6.63672 0.798877 7.21327L4.16196 10.4233L3.36653 14.9577C3.22335 15.7774 4.10469 16.3913 4.84285 16.008L9.00137 13.867L13.1599 16.008C13.8981 16.3882 14.7794 15.7774 14.6362 14.9577L13.8408 10.4233L17.2039 7.21327C17.8084 6.63672 17.4743 5.6301 16.6407 5.51167L11.9922 4.84786L9.91453 0.721634C9.54227 -0.0138572 8.46366 -0.0232067 8.08822 0.721634Z" fill="#FFCF55"/>
                        </svg>
                        {{total}}.0/342
                    </p>
                </div>
                <div v-if="profile.verification === 0 && $route.name !== 'client'" class="col-3 text-right">
                    <p>Верифицируйте аккаунт <br>чтобы получить ранк</p>
                    <router-link to="/verification">Верифицировать</router-link>
                </div>
                <div v-else-if="profile.verification === 1 && $route.name !== 'client'" class="col-3 text-right rang">
                    <figure :title="profile.rang.name"  v-if="profile.rang">
                        <img :title="profile.rang.name" :src="url + profile.rang.icon" alt="">
                    </figure>
                </div>
                <div v-else class="col-3 text-right mt-3">
                    <p>Аккаунт не верифицирован</p>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import api from '@/help/api'
    import { mapGetters } from 'vuex'
    export default {
        props: {
            profile: {
                type: Object
            },
        },
        data() {
            return {
                url: 'http://37.46.133.192/',
                image: '',
                img: ''
            }
        },
        computed: {
            ...mapGetters([
                'TYPE',
                'API_TOKEN',
                'TOKEN'
            ]),
            total() {
                let price = 0
                if(this.profile)
                    price = parseInt((
                        this.profile.reviews_all.speed + 
                        this.profile.reviews_all.punctuality + 
                        this.profile.reviews_all.quality + 
                        this.profile.reviews_all.price
                    ) / 4);
                return price;
            }
        },
        methods: {            
            fileChangeHandler(e){
                let files = Array.from(e.target.files);
                this.img = e.target.files[0];
                console.log(this.img)
                var images = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.images = e.target.result;
                    this.image = vm.images;
                };
                reader.readAsDataURL(files[0]);
                this.newImage();
            },
            async newImage(){
                let formData = new FormData();
                formData.append('token', this.TOKEN);
                formData.append('phone', this.API_TOKEN.phone);
                formData.append('name', this.API_TOKEN.name);
                formData.append('city_id', this.API_TOKEN.city ? this.API_TOKEN.city.id : '1');
                formData.append('avatar', this.img);
                await api.post('/' + this.TYPE + '/edit', formData)
                .then(response => {
                    console.log(response);
                    if(response.data.statusCode === 200){
                        this.disabled = true
                    }
                })
                .catch(e => {
                    console.log(e.response)
                })
            }
        },
    }
</script>

<style scoped>
    .profile-header{
        background: #0069c4;
        padding-top: 40px;
        color: #fff;
        padding-bottom: 20px;
    }
    .name{
        color: #fff;
        font-size: 24px;
        margin-bottom: 10px;
    }
    a{
        color: rgb(255, 217, 0);
        cursor: pointer;
    }
    small{
        color: #5d9fd9;
    }
    .avatar figure{
        position: relative;
        width: 200px;
        height: 200px;
        margin-bottom: -60px;
    }
    .avatar figure img{
        border-radius: 10px;
        width: 100%;
        height: 100%;
        border: 1px solid #eee;
    }
    .flex {
        font-size: 14px;
    }
    .rating{
        margin-bottom: 0;
        margin-top: 1.8rem;
    }
    .rang{
        text-align: right;
    }
    .rang figure{
        width: 50px;
        height: 50px;
        background: #fff;
        margin-right: 0;
        position: relative;
        border-radius: 50% 50%;
        margin: 0 0 0 auto;
        cursor: pointer;
    }
    .rang img{
        width: 20px;
        height: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .avatar input{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }
</style>