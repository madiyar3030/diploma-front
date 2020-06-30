<template>
    <div class="verification">
        <b-container>
            <h2>Верификация аккаунта</h2>
            <b-row>
                <div class="col-md-6 col-12">
                    <FormulateForm
                        class="order-form"
                        name="verification"
                        @submit="verification"
                        v-model="values"
                    >
                        <FormulateInput
                            type="text"
                            name="iin"
                            placeholder="ИИН"
                            validation="required|min:12,length|max:12,length"
                        />
                        <FormulateInput
                            type="text"
                            name="ip"
                            placeholder="ИП"
                            validation="required"
                        />
                        <FormulateInput
                            type="text"
                            name="passport"
                            placeholder="Паспорт"
                            validation="required|min:6,length"
                        />
                        <div v-for="item in 3" :key="item" style="position: relative;">
                            <img v-if="image[item-1]" style="margin-top: 10px;" :src="image[item-1]" alt=""><br>
                            <input @change="fileChangeHandler" type="file">
                            <a v-if="!image[item-1]">Прикрепить файл</a>
                        </div>
                        <button :disabled="img.length !== 3" type="submit" class="blueBtn">Отправить</button>
                    </FormulateForm>
                </div>
                <div class="col-md-6 col-12">
                    <p>Необходимо прикрепить документы:</p>
                    <ol>
                        <li>Документ 1 <span v-if="image[0]">&#10003;</span></li>
                        <li>Документ 2 <span v-if="image[1]">&#10003;</span></li>
                        <li>Документ 3 <span v-if="image[2]">&#10003;</span></li>
                    </ol>
                </div>
            </b-row>
        </b-container>
        <div v-if="show" class="modalBox">
            <div class="box">
                <h4>Ваша заявка отправлена!</h4>
                <p>Пожалуйста, дождитесь пока модераторы полностью подтвердить ваши документы</p>
                <router-link tag="button" to="/">OK</router-link>
            </div>
            <div class="close"></div>
        </div>
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                image: '',
                values: {},
                img: [],
                image: [],
                count: 0,
                show: false
            }
        },
        computed: {
            ...mapGetters([
                'TOKEN'
            ])
        },
        methods: {
            verification () {
                let formData = new FormData();
                formData.append('ip', this.values.ip);
                formData.append('iin', this.values.iin);
                formData.append('passport', this.values.passport);
                formData.append('token', this.TOKEN);
                for (let i = 0; i < this.img.length; i++) {
                    formData.append('passport_images[' + i + ']', this.img[i]);                    
                }
                api.post('/driver/verification', formData)
                .then(response => {
                    console.log(response)
                    if(response.data.statusCode === 200)
                        this.show = true;
                })
                .catch(e => {
                    console.log(e.response)
                })


                console.log('verification')
            },
            fileChangeHandler(e, queue){
                this.count++;
                // for (let i = 0; i < this.count; i++) {
                    let files = Array.from(e.target.files);
                    this.img.push(e.target.files[0]);
                    console.log(this.img)
                    var images = new Image();
                    var reader = new FileReader();
                    var vm = this;

                    reader.onload = (e) => {
                        vm.images = e.target.result;
                        this.image.push(vm.images);
                    };
                    reader.readAsDataURL(files[0]);
                // }
            },
        },
        
    }
</script>

<style scoped>
    h2{
        margin: 4% 0 7%;
    }
    ol{
        padding-left: 18px;
    }
    button{
        margin-top: 5%;
    }
    a{
        color: rgb(18, 109, 194);
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 1px dashed skyblue;
        font-weight: bolder;
    }
    img{
        width: 150;
        height: 81px;
    }
    button:disabled{
        cursor: no-drop;
    }
    .modalBox{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .3);
    }
    .modalBox .box{
        width: 400px;
        background: #fff;
        padding: 20px 30px;
        text-align: center;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
    }
    .modalBox .box p{
        color: #666;
    }
    .modalBox .box button{
        padding: 3px 50px;
        background: rgb(255, 69, 69);
        border: 1px solid rgb(243, 86, 86);
        color: #fff;
        border-radius: 4px;
    }
    .close{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
    }
</style>