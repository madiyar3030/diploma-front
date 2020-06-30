<template>
    <div class="signup">
        <FormulateForm
            class="order-form"
            name="signup"
            @submit="signup"
            v-model="values"
        >
            <h4>Регистрация бесплатно</h4>
            <FormulateInput
                name="types"
                :options="{client: 'Клиент', driver: 'Исполнитель'}"
                type="select"
                placeholder="Тип пользователя"
                validation="required"
            />
            <FormulateInput
                type="text"
                name="phone"
                placeholder="Номер телефона"
                validation="required"
            />
            <FormulateInput
                type="password"
                name="password"
                placeholder="Пароль"
                validation="required"
            />
            <FormulateErrors />
            <FormulateInput
                type="submit"
                label="Регистрироваться"
            />
            <hr>
            <p>Уже зарегистрированы? Тогда <router-link to="/sign/signin">Войдите</router-link></p>
        </FormulateForm>
        <div class="info">
            Нажимая "Зарегистрироваться", вы подтверждаете, что ознакомлены, 
            полностью согласны и принимаете условия <a>"Соглашения об оказании
            услуг по содействию в трудоустройстве (офорте)"</a>
        </div>
    </div>
</template>

<script>
    import api from '@/help/api'
    export default {
        data() {
            return {
                values: {
                    types: "driver"
                },
            }
        },
        methods: {
            async signup () {
                await api.post('/client/register', {
                    phone: this.values.phone
                })
                .then(response => {
                    console.log(response);
                    this.$router.push('/signup')
                })
                .catch(e => {
                    console.log(e.response)
                })
                console.log('sdsdsd')
            }
        },
    }
</script>

<style scoped>
    form{
        text-align: center;
        padding: 15% 40px 20px 40px;
        /* border: 2px solid rgba(0, 0, 0, .1); */
        border-top: none;
        width: 500px;
        margin: 0 auto;
        border-radius: 7px;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, .4);
    }
    input{
        width: 100%;
    }
    ul{
        padding-left: 0;
    }
    li{
        list-style: none;
        text-align: left;
    }
    form a{
        color: rgb(11, 160, 219);
        cursor: pointer;
    }
    .signup h4{
        margin-bottom: 10%;
    }
    .info{
        width: 500px;
        margin: 0 auto;
        font-size: 14px;
        text-align: center;
        margin-top: 1.5%;
    }
    .info a{
        color: skyblue;
    }
</style>