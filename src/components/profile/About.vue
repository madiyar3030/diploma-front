<template>
    <div class="profile-about pt-5">
        <b-container>
            <FormulateForm
                class="order-form"
                name="signup"
                @submit="about"
                v-model="values"
            >
                <b-row>
                    <div class="col-8">
                        <tabs></tabs>
                        <FormulateInput
                            type="textarea"
                            :disabled="disabled"
                            v-model="API_TOKEN.description"
                            placeholder="Расскажите о себе"
                            validation="required"
                        />
                        <hr>
                        <div v-if="TYPE === 'client' || API_TOKEN.verification === 1">
                            <p class="p18">Название ИП</p>
                            <FormulateInput
                                v-if="TYPE === 'client' && API_TOKEN || API_TOKEN.verification === 1"
                                type="text"
                                disabled
                                v-model="API_TOKEN.ip"
                                placeholder="Название ИП"
                                validation="required"
                            />
                            <hr>
                            <p class="p18">Документ</p>
                            <FormulateInput
                                v-if="API_TOKEN.iin || !disabled"
                                type="text"
                                disabled
                                v-model="API_TOKEN.iin"
                                placeholder="Документ"
                            />
                            <a @click="disabled = !disabled" v-if="!API_TOKEN.iin && disabled">Добавить</a>
                            <hr>
                        </div>
                        <div v-if="TYPE === 'driver'">
                            <p class="p18">Водительские уд.</p>
                            <FormulateInput
                                v-if="API_TOKEN.passport || !disabled"
                                type="text"
                                :disabled="disabled"
                                v-model="API_TOKEN.passport"
                                placeholder="Водительские уд."
                                validation="required"
                            />
                            <a @click="disabled = !disabled" v-if="!API_TOKEN.passport && disabled">Добавить</a>
                            <hr>
                        </div>
                        <p class="p18">Контакты</p>
                        <!-- <FormulateInput
                            v-if="API_TOKEN.phone || !disabled"
                            type="text"
                            :disabled="disabled"
                            v-model="API_TOKEN.phone"
                            placeholder="Расскажите о себе"
                            validation="required"
                        /> -->
                        <the-mask
                            v-if="API_TOKEN.phone || !disabled"
                            v-model="API_TOKEN.phone" 
                            :disabled="disabled"
                            mask="+7 (7##) ### ##-##" 
                            placeholder="+7 (700) 777 77-77"
                        ></the-mask>
                        <a @click="disabled = !disabled" v-if="!API_TOKEN.phone && disabled">Добавить</a>
                        <hr>
                    </div>
                    <div class="col-3">
                        <button v-if="disabled" @click.prevent="disabled = false" class="cancelBtn">Редактировать</button>
                        <button v-if="!disabled" type="submit" class="saveBtn">Сохранить</button><br>
                        <button v-if="!disabled" @click.prevent="disabled = true" class="cancelBtn">Отменить</button>
                        <br>
                        <button @click.prevent="pay = true" class="saveBtn">Пополнить баланс</button>

                    </div>
                </b-row>
            </FormulateForm>
        </b-container>
        <div v-if="pay" class="pay">
            <form>
                <h4 class="mb-4">Введите сумму к оплате</h4>
                <input v-model="sum" type="number" placeholder="Сумма" >
                <button @click.prevent="paybox()" class="cancelBtn">Перейти к оплате</button>
            </form>
            <div @click="pay = false" class="close"></div>
        </div>
    </div>
</template>

<script>
    import Tabs from './Tabs'
    import { mapGetters } from 'vuex'
    import {TheMask} from 'vue-the-mask'
    import api from '@/help/api'
    export default {
        data() {
            return {
                description: '',
                values: {},
                disabled: true,
                pay: false,
                sum: ''
            }
        },
        computed: {
            ...mapGetters([
                'API_TOKEN',
                'TYPE',
                'TOKEN'
            ])
        },
        methods: {
            async about() {
                await api.post('/' + this.TYPE + '/edit', {
                    token: this.TOKEN,
                    phone: this.API_TOKEN.phone,
                    name: this.API_TOKEN.name,
                    city_id: this.API_TOKEN.city ? this.API_TOKEN.city.id : '1',
                    iin: this.API_TOKEN.iin,
                    passport: this.API_TOKEN.passport,
                    description: this.API_TOKEN.description
                })
                .then(response => {
                    console.log(response);
                    if(response.data.statusCode === 200){
                        this.disabled = true
                    }
                })
                .catch(e => {
                    console.log(e.response)
                })
            },
            async paybox(){
                if(this.sum !== ''){
                    await api.get('http://37.46.133.192/api/paybox/' + this.sum + '/' + this.API_TOKEN.id)
                    .then(response => {
                        console.log(response)
                        if(response.data.statusCode === 200){
                            location.href=response.data.result
                        }
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                }
            }
        },
        components: {
            Tabs,
            TheMask
        },
    }
</script>

<style scoped>
    .p18{
        font-weight: 500;
    }
    button{
        width: 100%;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 4px;
        font-weight: bolder;
        outline: none;
    }
    .cancelBtn{
        background: #fff;
        border: 1px solid #eee;
        color: #0069c4;
    }
    .saveBtn{
        background: #ffc525;
        border: 1px solid #ffc525;
        color: #000;
    }
    a{
        color: #0069c4;
        cursor: pointer;
        font-weight: bolder;
    }
    a:hover{
        color: #0069c4;
    }
    .pay{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, .2);
        z-index: 2;
    }
    .pay .close{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .pay form{
        position: absolute;
        width: 400px;
        padding: 40px 20px;
        border-radius: 4px;
        background: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
</style>