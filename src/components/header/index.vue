<template>
    <div class="header">
        <b-container>
            <b-row class="d-flex justify-content-between">
                <div class="d-flex">
                    <div class="header-logo">
                        <img src="" alt="">
                    </div>
                    <router-link class="tab" :class="{active: $route.name === 'Home'}" tag="p" to="/">Главная</router-link>
                    <router-link class="tab" :class="{active: $route.name === 'orders'}" tag="p" to="/orders/0">Заказы</router-link>
                </div>
                <div v-if="!AUTH" class="d-flex">
                    <p @click="sign('signin')">Войти</p>
                    <p @click="sign('signup')">Регистрация</p>
                </div>
                <div class="d-flex" v-if="AUTH">
                    <span v-if="TYPE === 'driver'" class="pr-4">
                        <router-link title="Группа" tag="span" to="/group/0">
                            <b-icon title="Группа" class="mr-2" icon="chat"></b-icon>
                        </router-link>
                    </span>
                    <span class="pr-4">
                        <router-link title="Сообщения" tag="span" to="/chats/0/0">
                            <b-icon title="Сообщения" class="mr-2" icon="bell"></b-icon>
                        </router-link>
                    </span>
                    <div class="profile">
                    <router-link tag="figure" to="/profile/profile-about" class="profile-img">
                        <img v-if="API_TOKEN.avatar !== null && API_TOKEN.avatar" :src="url + API_TOKEN.avatar" alt="">
                        <img v-if="API_TOKEN.avatar === null" src="@/assets/images/profile.jpg" alt="">
                        <!-- <img src="@/assets/images/profile.jpg" alt=""> -->
                    </router-link>
                    <div class="profile-block">
                        <ul>                            
                            <li @click="open('profile-about')">О себе</li>
                            <li @click="open('profile-orders')">Активные заявки</li>
                            <li @click="open('profile-reviews')" v-if="TYPE === 'client'">Отзывы</li>
                            <li @click="open('profile-transport')" v-if="TYPE === 'driver'">Транспорты</li>
                            <li @click="exit()">Выйти</li>
                        </ul>
                    </div>
                </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                url: 'http://37.46.133.192/'
            }
        },
        computed: {
            ...mapGetters([
                'AUTH',
                'API_TOKEN',
                'TYPE'
            ])
        },
        methods: {
            sign(a) {
                if(a === 'signin'){
                    this.$router.push({name: 'sign', params: {name: 'signin'}})
                }
                else if(a === 'signup'){
                    // this.$router.push({name: 'sign', params: {name: 'signup'}})
                    this.$router.push('/signup/client');
                }
                
            },
            open(a) {
                if(this.$route.params.name !== a)
                    this.$router.push({name: 'profile-name', params: {name: a}})
            },
            exit(){
                Cookies.remove('easy-auth');
                Cookies.remove('easy-token');
                Cookies.remove('easy-type');
                this.$store.dispatch('GET_AUTH', false);
                this.$store.dispatch('GET_TOKEN', false);
                this.$store.dispatch('GET_TYPE', false);

                if(this.$route.name !== 'Home'){
                    this.$router.push('/')
                }
                
            }
        },
        created () {
            this.$store.dispatch('GET_AUTH');
            let token = Cookies.get('easy-token');
            if(token)
                this.$store.dispatch('GET_API_TOKEN', Cookies.get('easy-token'));
        },
    }
</script>

<style scoped>
    .header{
        border-bottom: 1px solid #eee;
        padding: 10px 0 0;
        /* overflow: hidden; */
    }
    .header .container{
        position: relative;
    }
    .row > div p{
        margin-left: 1.5rem;
        font-weight: 600;
        cursor: pointer;
    }
    .profile-img{
        height: 20px;
    }
    .profile-img img{
        height: 30px;
        width: 30px;
        border-radius: 50% 50%;
        cursor: pointer;
    }
    .tab{
        border-bottom: 2px solid #fff;
        margin-bottom: 0;
        padding-bottom: 1rem;
    }
    .tab.active{
        border-bottom: 2px solid #ffc525;
    }
    .profile{
        width: 50px;
        text-align: right;
        height: 100%;
    }
    .profile-block{
        position: absolute;
        padding-top: 20px;
        right: 0%;
        z-index: 3;
        transform: translateY(-200px);
        transition: all .5s;
        margin-top: -13px;
    }
    .profile-block ul{
        padding: 10px 20px;
        background: #fff;
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
        
    }
    .profile-block li{
        list-style: none;
        cursor: pointer;
    }
    .profile figure:hover ~ .profile-block ul, .profile:hover .profile-block:hover ul{
        opacity: 1;
        visibility: visible;
        box-shadow: 0px 9px 16px 5px rgba(0, 0, 0, .3);
    }
    .profile figure:hover ~ .profile-block, .profile:hover .profile-block:hover{
        transform: translateY(0);
    }
    svg{
        font-size: 24px;
        margin-top: 5px;
        cursor: pointer;
    }
</style>