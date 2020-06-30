<template>
    <div class="code">
        <FormulateForm
            class="order-form"
            name="code"
            @submit="code"
            v-model="values"
        >
            <h4>Подтвердить номер телефона</h4>
            <h6>Код отправлен на номер: {{phone}}</h6>
            <FormulateInput
                type="text"
                name="code"
                placeholder="Введите код"
                validation="required|max:6,length|min:6,length"
                maxlength="6"
                size="6"
            />
            <FormulateInput
                class="blueBtn"
                type="submit"
                label="Подтвердить"
            />
            <p v-if="time > 0" class="flex">
                <span class="grayColor">Отправить код повторно вы можете через:</span>
                <span>00:<span v-if="time <= 9">0</span>{{time}}</span>
            </p>
            <div @click="yet()" v-if="time <= 0" class="yet">
                <small>Отправить еще</small>
            </div>
        </FormulateForm>
        <div class="info grayColor">
            &copy; 2018 Easy. Все права защищены
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phone: localStorage.getItem('phone-code') || 87029329156,
                time: 10,
                values: {},
            }
        },
        methods: {
            code () {
                console.log(this.values.code)
                this.$router.push('/');
            },
            timer(){
                if(this.time >= 1)
                this.time--;
            },
            yet(){
                this.time = 10;
            }
        },
        mounted () {
            this.timer()
            setInterval(this.timer.bind(this) , 1000)
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
    form h6{
        margin-bottom: 1rem;
    }
    .yet{
        color: rgb(11, 160, 219);
        cursor: pointer;
        margin-top: 3px;
    }
</style>