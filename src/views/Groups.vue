<template>
    <div class="chats">
        <b-container>
            <h3>
                <router-link to="/new-group" tag="button" class="float-right btn btn-danger btn-circle waves-effect waves-circle waves-float waves-effect pull-right mt--2">
                    Создать группу
                </router-link>
                Все сообщения
            </h3>
            <b-row class="mt-3">
                <div class="col-md-3 col-12 lists">
                    <div 
                        v-for="item in GROUPS.group"
                        :key="item.id"
                        @click="open(item.id)"
                        :class="{active: id === item.id.toString()}"
                    >
                        <div class="list" @click="open(item.id)">
                            <p class="mb-0">{{item.name}}</p>
                        </div>
                    </div>
                    <div 
                        v-for="item in GROUPS.participant"
                        :key="item.id"
                        @click="open(item.id)"
                        :class="{active: id === item.id.toString()}"
                    >
                        <div v-if="item.group" class="list">
                            <p class="mb-0">{{item.group.name}}</p>
                        </div>
                    </div>
                </div>
                <!-- ----------------------------------------------------------------------------------------- -->
                <div class="col-md-6 col-12" v-if="id !== '0'">
                    <div class="messages">
                        <div v-for="item in GROUP.slice().reverse()" :key="item.id">
                            <div v-if="item.driver && item.driver.id !== API_TOKEN.id">
                                <span class="bold pr-1">{{item.driver.name}}</span> 
                                <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(11, 16)}}</span>
                            </div>
                            <div v-if="item.driver.id !== API_TOKEN.id" class="other">
                                {{item.text}}
                            </div>
                            <div v-if="item.driver && item.driver.id === API_TOKEN.id" class="me mt-3">
                                <div>
                                    <span class="bold pr-1">Я</span> 
                                        <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(-8, -2)}}</span>
                                </div>
                                <div class="message">
                                    {{item.text}}
                                </div>
                            </div>
                        </div>
                        <div v-if="GROUP.length === 0">
                            Пока еще нет сообщении
                        </div>
                    </div>
                    <div class="sendMessage">
                        <form @submit.prevent="sendMessage">
                            <input v-model="message" type="text" placeholder="Введите текст сообщения">
                            <button type="submit">OK</button>
                        </form>
                    </div>
                </div>
                <!-- ----------------------------------------------------------------------------------------- -->
                <div class="col-md-6 col-12 messages" v-if="id === '0'">
                    Выберите кому хотите написать
                </div>
                <div class="col-md-3 col-12 d-flex functions" v-if="GROUP_INFO">
                    <div class="mt-2">
                        <small>Создатель</small><br>
                        <strong v-if="GROUP_INFO.creator">{{GROUP_INFO.creator.name}}</strong><br>
                        <small>Участники</small>
                        <div v-for="item in GROUP_INFO.participants" :key="item.id">
                            <strong>{{item.name}}</strong> 
                            <small @click="deleteGroupUser(item.id)" v-if="GROUP_INFO.creator && GROUP_INFO.creator.id === API_TOKEN.id" style="color: #aaa; cursor: pointer;" class="pl-3">Удалить</small>
                        </div>
                        <div class="text-center">
                            <button @click="inv=true" class="invetedBtn">Пригласить</button>
                        </div>
                    </div>
                    <!-- <div v-if="GROUP_INFO.creator && GROUP_INFO.creator.id === API_TOKEN.id" class="text-center btn">
                        <button @click="deleteGroup()">Удалить группу</button>
                    </div> -->
                </div>
            </b-row>
            <div v-if="GROUPS.length === 0" style="min-height: 50vh;">
                <h3 class="mt-5 mb-5">Вы еще не зашли в группу</h3>
            </div>
        </b-container>
        
        <div v-if="inv" class="invited">
            <form>
                <p>Чтобы пригласить нужно ввести номер исполнителя</p>
                <the-mask v-model="phone" mask="+7 (7##) ### ##-##" />
                <button type="submit" @click.prevent="invited()" class="invetedBtn">Пригласить</button>
            </form>
            <div @click="inv=false" class="close"></div>
        </div>

    </div>
</template>

<script>
    import api from '@/help/api'
    import io from 'socket.io-client'
    import {TheMask} from 'vue-the-mask'
    import { mapGetters } from 'vuex'
    export default {
        props: {
            id: {
                type: String,
                default: '0'
            }

        },
        data() {
            return {
                user: '',
                socket: {},
                message: '',
                messages: [],
                menu_id: null,
                lists: [],
                url: 'http://37.46.133.192/',
                inv: false,
                phone: ''
            }
        },
        computed: {
            ...mapGetters([
                'GROUPS',
                'GROUP',
                'TOKEN',
                'API_TOKEN',
                'GROUP_INFO'
            ])
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();
                
                this.emitMessage('send_group_id', {token: this.TOKEN, group_id: parseInt(this.id), text: this.message, page: 0})
                this.message = ''
            },
            open(id){
                if(this.id !== id.toString()){
                    // this.id = id;
                    // this.$store.dispatch('GET_MESSAGES', {
                    //     chat_id: this.id,
                    //     page: 1
                    // });
                    this.$router.push({name: 'group', params: {id: id.toString()}})
                }
                this.emitMessage('get_group_id', {group_id: id, page: 0})
                this.$store.dispatch('GET_GROUP_INFO', id)
                this.socket.on('group_list_' + this.TOKEN, (data) => {
                    this.$store.dispatch('GET_GROUPS', data)
                });
                this.socket.on('get_group_id_' + id, (data) => {
                    this.$store.dispatch('GET_GROUP', data)
                });
            },
            emitMessage(link, arr){
                this.socket.emit(link, JSON.stringify(arr));
            },
            async invited(){
                await api.post('/driver/group/add/driver', {
                    token: this.TOKEN,
                    phone: '77' + this.phone
                })
                .then(response => {
                    console.log(response)
                    this.makeToast('success');
                    this.inv = false;
                })
                .catch(e => console.log(e.response))
            },
            async deleteGroupUser(id){
                await api.post('/driver/group/delete/driver', {
                    token: this.TOKEN,
                    driver_id: id
                })
                .then(response => {
                    console.log(response);
                    if(response.data.statusCode === 200){
                        this.makeToast('success');
                    }else{
                        this.makeToast('danger', response.data.message);
                    }
                })
            }
        },
        mounted() {
            this.socket.on('group_list_' + this.TOKEN, (data) => {
                this.$store.dispatch('GET_GROUPS', data)
            });
            this.socket.on('get_group_id_' + this.id, (data) => {
                this.$store.dispatch('GET_GROUP', data)
            });
            this.id = this.$route.params.id
        },
        components: {
            TheMask,
        },
        created () {
            this.socket = io('http://37.46.133.192:3000');    
            
            this.emitMessage('group_lists', {token: this.TOKEN})

            this.emitMessage('get_group_id', {group_id: parseInt(this.id), page: 1})

            this.$store.dispatch('GET_GROUP_INFO', this.id)
        },
        watch: {
            id() {
                if(this.$route.params.id !== this.id)
                    this.$router.push({name: 'chats', params: {id: this.id, client_id: this.client_id.toString()}})
            }
        },
    }
</script>

<style scoped>
    .bold{
        font-weight: bolder;
    }
    span.hour{
        color: #ccc;
        font-size: 14px;
    }
    .chats{
        padding-top: 40px;
    }
    figure {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 50% 50%;
    }
    .messages{
        box-shadow: 0 0 5px rgba(0, 0, 0, .2);
        padding: 10px;
        height: 80vh;
        overflow-y: scroll;
        min-height: 300px;
    }
    .messages > div > div{
        width: 60%;
    }
    .me{
        margin-left: 40%;
    }
    .other, .message{
        font-size: 14px;
    }
    .message{
        background: skyblue;
        padding: 10px 15px;
        border-radius: 4px;
        margin-top: 10px;
    }
    .lists > div{
        margin: 5px 0;
        padding: 10px;
    }
    .lists > div.active{
        background: rgba(57, 232, 255, 0.3);
    }
    .lists > div:hover{
        background: rgba(57, 232, 255, 0.1);
        cursor: pointer;
    }
    .lists figure{
        margin-bottom: 0;
    }
    .sendMessage form{
        width: 100%;
        padding: 0;
        position: relative;
    }
    .sendMessage form input{
        width: 100%;
        max-width: 100%;
        padding: 10px;
    }
    .sendMessage button{
        position: absolute;
        right: 10px;
        top: 10px;
        background: none;
        border: none;
    }
    .functions{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #eee;
        margin-left: -15px;
    }
    .functions button{
        border: none;
        background: none;
        font-weight: bolder;
        color: #aaa;
    }
    .functions .invetedBtn{
        width: 80%;
        border: 2px solid rgb(80, 235, 255);
        color: rgb(80, 235, 255);
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
    }
    .invited{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .2);
    }
    .invited .close{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .invited form{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        z-index: 3;
        text-align: center;
        background: #fff;
        padding: 40px 20px;
    }
    .invited button{
        background: #ffc525;
        color: #000;
        border: 1px solid #ffc525;
        width: 100%;
        font-weight: bolder;
        padding: 7px 0;
        border-radius: 4px;
        margin-top: 10px;
    }
    
</style>