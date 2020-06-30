<template>
    <div class="signup-page">
        <b-container>
            <FormulateForm
                class="order-form"
                name="signup"
                @submit="signup"
                v-model="values"
            >
                <h2>Регистрация</h2>
                <p class="font-weight-bold p18">Вид пользователя</p>
                <FormulateInput
                    name="types"
                    :options="{client: 'Клиент', driver: 'Исполнитель'}"
                    type="select"
                    placeholder="Вы не выбрали"
                    validation="required"
                    v-model="types"
                />
                <p class="font-weight-bold p18">Ваши данные</p>
                <FormulateInput
                    type="text"
                    name="name"
                    placeholder="Ф.И.О"
                    validation="required"
                />
                <p class="font-weight-bold p18">Телефон номер</p>
                <the-mask v-model="phone" mask="+7 (7##) ### ##-##" placeholder="+7 (700) 777 77-77"></the-mask>
                <p class="font-weight-bold p18">Ваш Email</p>
                <FormulateInput
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    validation="required|email"
                />
                <p class="font-weight-bold p18">Город</p>
                <FormulateInput
                    name="city_id"
                    :options="cities"
                    type="select"
                    placeholder="Вы не выбрали"
                    validation="required"
                />
                <p class="font-weight-bold p18">Ваш ИИН</p>
                <FormulateInput
                    type="number"
                    name="iin"
                    placeholder="ИИН"
                    size="12"
                    length="12"
                    maxlength="12"
                    validation="required|min:12,length|max:12,length"
                />
                <p class="font-weight-bold p18">Опишите себя</p>
                <FormulateInput
                    type="textarea"
                    name="about"
                    validation="required"
                    validation-name="Опишите себя"
                />                
                <div style="position: relative;">
                    <img :src="image" alt="">
                    <input @change="fileChangeHandler" type="file"><br>
                    <a>Прикрепить файл</a>
                </div>
                <!-- <div v-if="types === 'driver'">
                    <p class="font-weight-bold p18">Техника</p>
                    <div class="flex">
                        <FormulateInput
                            name="type_transport"
                            :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
                            type="select"
                            placeholder="Тип транспорта"
                        />
                        <FormulateInput
                            name="massa"
                            :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
                            type="select"
                            placeholder="Вес"
                        />
                    </div>
                    <FormulateInput
                        type="text"
                        name="name_technique"
                        placeholder="Название транспорта"
                        validation="required"
                    />
                    <FormulateInput
                        type="text"
                        name="gos"
                        placeholder="ГОС номер"
                        validation="required"
                    />
                    <p class="font-weight-bold p18">Характеристика</p>
                    <FormulateInput
                        type="textarea"
                        name="characteristic"
                        validation="required"
                        validation-name="Характеристика"
                    />
                </div> -->
                <button type="submit" class="blueBtn">Сохранить</button>
            </FormulateForm>
        </b-container>
    </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask'
    import api from '@/help/api'
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    export default {
        props: {
            type: {
                type: String
            },
        },
        data() {
            return {
                values: {},
                types: this.$route.params.type,
                phone: '',
                img: '',
                image: '',
            }
        },
        computed: {
            ...mapGetters([
                'CITIES',
            ]),
            cities(){
                return this.repeat(this.CITIES)
            },
        },
        methods: {
            async signup () {
                let url = '/' + this.types + '/register';
                let formData = new FormData();
                formData.append('phone', '77' + this.phone);
                formData.append('name', this.values.name);
                formData.append('email', this.values.email);
                formData.append('iin', this.values.iin);
                formData.append('city_id', this.values.city_id);
                formData.append('description', this.values.about);
                formData.append('avatar', this.img);
                await api.post(url, formData)
                .then(response => {
                    console.log(response);
                    
                    Cookies.set('easy-auth', true, 14);
                    Cookies.set('easy-token', response.data.result.token, 14);
                    Cookies.set('easy-type', this.types)
                    this.$store.dispatch('GET_TOKEN', response.data.result.token)
                    this.$store.dispatch('GET_TYPE', this.values.types)
                    this.$store.dispatch('GET_AUTH', true)
                    this.$store.dispatch('GET_API_TOKEN', response.data.result.token);
                    this.makeToast('success', response.data.message);
                    if(response.data.statusCode === 200) {
                        this.makeToast('success', 'Вы зарегистрированы');
                        this.$router.push('/');
                    }
                })
                .catch(e => {
                    this.makeToast('success', e.response.data.message);
                    console.log(e.response);
                })
            },
            fileChangeHandler(e, queue){
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
            },
        },
        components: {
            TheMask,
        },
        created () {
            this.$store.dispatch('GET_CITIES');
        },
        watch: {
            types() {
                this.$router.push({name: 'signup', params: {type: this.types}})
            }
        },
    }
</script>

<style scoped>
    h2{
        margin-top: 40px;
    }
    p{
        margin-top: 25px;
    }
    .signup-page{
        padding-bottom: 5%;
    }
    .signup-page .flex{
        display: flex;
        justify-content: flex-start;
    }
    .signup-page .flex > div:first-child{
        margin-right: 20px;
    }
    button{
        margin-top: 20px;
    }
    .signup-page a{
        color: rgb(18, 109, 194);
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 1px dashed skyblue;
        font-weight: bolder;
        margin-bottom: 5%;
    }
    img{
        width: 150px;
        height: 80px;
    }
</style>