<template>
    <div class="signin">
        <h1></h1>

        <FormulateForm
            class="order-form"
            name="signup"
            @submit="signin"
            v-model="values"
        >
             <h4>Авторизоваться</h4>
            <FormulateInput
                name="types"
                :options="{client: 'Клиент', driver: 'Исполнитель'}"
                type="select"
                placeholder="Вы не выбрали"
                validation="required"
            />
            <!-- <FormulateInput
                type="text"
                name="phone"
                placeholder="Номер телефона"
                validation="required"
            /> -->
            <the-mask v-model="phone" mask="+7 (7##) ### ##-##" placeholder="+7 (700) 777 77-77"></the-mask>
            <FormulateInput
                type="password"
                name="password"
                placeholder="Пароль"
                validation="required"
            />
            <FormulateInput
                type="submit"
                label="Войти"
            />
            <hr>
            <p>У вас нет аккаунта? Тогда <router-link :to="'/signup/' + values.types">Регистрируйтесь</router-link></p>
        </FormulateForm>
    </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask'
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                values: {
                    types: "client"
                },
                phone: ''
            }
        },
        methods: {
            async signin() {
                let url = '';
                if(this.values.types === 'client') url = '/client/auth'
                else if(this.values.types === 'driver') url = '/driver/auth'
                await api.post(url, {
                    phone: '77' + this.phone
                })
                .then(response => {
                    Cookies.set('easy-auth', true, 14);
                    Cookies.set('easy-token', response.data.result.token, 14);
                    Cookies.set('easy-type', this.values.types)
                    this.$store.dispatch('GET_TOKEN', response.data.result.token)
                    this.$store.dispatch('GET_TYPE', this.values.types)
                    localStorage.setItem('phone-code', this.values.phone)
                    this.$store.dispatch('GET_AUTH', true)
                    this.makeToast('success');
                    this.$router.push('/')
                    this.$store.dispatch('GET_API_TOKEN', response.data.result.token);
                })
                .catch(e => {
                    this.makeToast('danger', 'Пользователь не найден');
                    console.log(e.response)
                })
            },
        },
        components: {
            TheMask,
        },
    }
</script>

<style scoped>
    form{
        text-align: center;
        padding: 5% 40px 20px 40px;
        /* border: 2px solid rgba(0, 0, 0, .1); */
        border-top: none;
        width: 500px;
        margin: 0 auto;
        border-radius: 7px;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, .4);
    }
    .login-form {
        padding: 2em;
        border: 1px solid #a8a8a8;
        border-radius: .5em;
        max-width: 500px;
        box-sizing: border-box;
    }
    .form-title {
        margin-top: 0;
    }
    .login-form::v-deep .formulate-input .formulate-input-element {
        max-width: none;
    }
    select{
        width: 100%;
    }
    @media (min-width: 420px) {
        .double-wide {
            display: flex;
        }
        .double-wide .formulate-input {
            flex-grow: 1;
            width: calc(50% - .5em);
        }
        .double-wide .formulate-input:first-child {
            margin-right: .5em;
        }
        .double-wide .formulate-input:last-child {
            margin-left: .5em;
        }
    }
</style>