<template>
    <div class="chats">
        <b-container>
            <h3>Все сообщения</h3>
            <b-row >
                <div class="col-md-3 col-12 mt-3 lists">
                    <div 
                        v-for="item in CHATS"
                        :key="item.id"
                        :class="{active: id === item.id.toString()}"
                    >
                        <div class="list d-flex" v-if="TYPE === 'driver'" @click="open(item.id, item.client.id)">
                            <figure>
                                <img v-if="item.client.avatar" :src="url + item.client.avatar" alt="">
                                <img v-if="!item.client.avatar" src="@/assets/images/profile.jpg" alt="">
                            </figure>
                            <p class="mb-0" v-if="item.client">{{item.client.name}} <br> {{item.last_message.text}}</p>
                        </div>
                        <div class="list d-flex" v-if="TYPE === 'client'" @click="open(item.id, item.driver.id)">
                            <figure>
                                <img v-if="item.driver.avatar" :src="url + item.driver.avatar" alt="">
                                <img v-if="!item.driver.avatar" src="@/assets/images/profile.jpg" alt="">
                            </figure>
                            <p v-if="item.driver">{{item.driver.name}}</p>
                        </div>
                    </div>
                </div>
                <!-- ----------------------------------------------------------------------------------------- -->
                <div class="col-md-9 col-12" v-if="id !== '0' && TYPE === 'driver'">
                    <div class="messages">
                        <div v-if="MESSAGES.data">
                            <div v-for="item in MESSAGES.data.slice().reverse()" :key="item.id">
                                <div v-if="item.role === 'client'">
                                    <span class="bold pr-1" v-if="item.client">{{item.client.name}}</span> 
                                    <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(11, 16)}}</span>
                                </div>
                                <div v-if="item.role === 'client'" class="other">
                                    {{item.text}}
                                </div>
                                <div v-if="item.role === 'driver'" class="me mt-3">
                                    <div>
                                        <span class="bold pr-1">Я</span> 
                                            <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(-8, -2)}}</span>
                                    </div>
                                    <div class="message">
                                        {{item.text}}
                                    </div>
                                </div>
                            </div>
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
                <div class="col-md-9 col-12" v-if="id !== '0' && TYPE === 'client'">
                    <div class="messages">
                        <div v-if="MESSAGES.data">
                            <div v-for="item in MESSAGES.data.slice().reverse()" :key="item.id">
                                <div v-if="item.role === 'driver'">
                                    <span class="bold pr-1" v-if="item.driver">{{item.driver.name}}</span> 
                                    <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(11, 16)}}</span>
                                </div>
                                <div v-if="item.role === 'driver'" class="other p-2">
                                    {{item.text}}
                                </div>
                                <div v-if="item.role === 'client'" class="me mt-3">
                                    <div>
                                        <span class="bold pr-1">Я</span> 
                                            <span class="hour" v-if="item.updated_at">{{item.updated_at.slice(-8, -2)}}</span>
                                    </div>
                                    <div class="message">
                                        {{item.text}}
                                    </div>
                                </div>
                            </div>
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
                <div class="col-md-9 col-12 messages" v-if="id === '0'">
                    Выберите кому хотите написать
                </div>
            </b-row>
        </b-container>
        <!-- <div class="card-body">
            <div class="messages" v-for="(item, index) in messages" :key="index">
                <p><span class="font-weight-bold">{{item}}</span></p>
            </div>
        </div> -->
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import { mapGetters } from 'vuex'
    export default {
        props: {
            id: {
                type: String,
                default: '0'
            },
            client_id: {
                type: String
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
                message_id: 0
            }
        },
        computed: {
            ...mapGetters([
                'CHATS',
                'MESSAGES',
                'TOKEN',
                'TYPE',
            ])
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();
                
                if(this.TYPE === 'driver'){
                    this.emitMessage('driver_send', {token: this.TOKEN, client_id: this.client_id, text: this.message, chat_id: this.id, page: 1, type: this.TYPE})
                }
                
                else if(this.TYPE === 'client'){
                    this.emitMessage('client_send', {token: this.TOKEN, driver_id: this.client_id, text: this.message, chat_id: this.id, page: 1, type: this.TYPE})
                }
                this.message = ''
            },
            open(id, client_id){
                // if(this.id !== id.toString()){
                    this.$router.push({name: 'chats', params: {id: id.toString(), client_id: client_id.toString()}})
                    this.message_id = id;
                    // this.id = id;
                    console.log(id, this.id, this.message_id)
                    this.emitMessage('chats', {token: this.TOKEN, type: this.TYPE})
                    this.emitMessage('chat_messages', {chat_id: id, page: 1, type: this.TYPE})


                    this.socket.on('chats_' + this.TYPE + '_' + this.TOKEN, (data) => {
                        this.$store.dispatch('GET_CHATS', data)
                    });
                    this.socket.on('client_chat_list_msg_' + id, (data) => {
                        this.$store.dispatch('GET_MESSAGES', data)
                    });
                // }
            },
            emitMessage(link, arr){
                this.socket.emit(link, JSON.stringify(arr));
            }
        },
        mounted() {
            console.log(this.message_id)
            this.id = this.$route.params.id
            this.socket.on('chats_' + this.TYPE + '_' + this.TOKEN, (data) => {
                this.$store.dispatch('GET_CHATS', data)
            });
            this.socket.on('client_chat_list_msg_' + this.id, (data) => {
                this.$store.dispatch('GET_MESSAGES', data)
            });
        },
        created () {
            this.message_id = this.id
            this.socket = io('http://37.46.133.192:3000');
            // this.$store.dispatch('GET_CHATS', {
            //     token: this.TOKEN
            // });           
            
            this.emitMessage('chats', {token: this.TOKEN, type: this.TYPE})

            this.emitMessage('chat_messages', {chat_id: this.message_id, page: 1, type: this.TYPE})
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
    .messages > div > div > div{
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
        padding: 5px 10px;
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
    }
    .sendMessage button{
        position: absolute;
        right: 10px;
        top: 5px;
        background: none;
        border: none;
    }
</style>