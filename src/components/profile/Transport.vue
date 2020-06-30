<template>
    <div class="transport">
        <b-container>            
            <tabs></tabs>
            <p class="p18">Мои техники</p>
            <button class="mb-3" @click="add=!add">Добавить технику</button>
            <div
                class="cars"
                v-for="item in API_TOKEN.cars"
                :key="item.id"
            >   
                <b-container>
                    <div class="flex">
                        <figure v-if="item.images && item.images.length > 0">
                            <img :src="url + item.images[0].path" alt="">
                            <!-- <img src="@/assets/images/profile.jpg" alt=""> -->
                        </figure>
                        <div>
                            <p class="mb-0">{{item.name}}</p>
                            {{item.info}}
                        </div>
                    </div>
                    <b-row>
                        <div class="col-md-6 col-12">ГОС номер</div>
                        <div class="col-md-6 col-12 text-right">{{item.number}}</div>
                    </b-row>
                    <b-row>
                        <div class="col-md-6 col-12">Тип транспорта</div>
                        <div v-if="item.car_transports && item.car_transports.length > 0" class="col-md-6 col-12 text-right">
                            {{item.car_transports[0].name}}
                        </div>
                    </b-row>
                    <button @click="deleteCar(item.id)" class="mt-3 mr-3 danger">Удалить</button>
                    <button @click="editCar(item)">Изменить</button>
                </b-container>
                <hr>
            </div>
            <div v-if="API_TOKEN.cars && API_TOKEN.cars.length === 0">
                Техники не добавлены
                <hr>
            </div>

        </b-container>
        <div class="new" v-if="add">
            <FormulateForm
                class="newForm"
                name="newOrder"
                @submit="action"
                v-model="values"
            >
                <p class="p18 text-center">
                    <span v-if="!edit">Добавить</span>
                    <span v-if="edit">Изменить</span>
                    технику
                </p>
                <FormulateInput
                    name="name"
                    type="text"
                    placeholder="Название"
                    v-model="name"
                />
                <FormulateInput
                    name="info"
                    type="text"
                    v-model="info"
                    placeholder="Краткая информация"
                />
                <FormulateInput
                    name="number"
                    type="text"
                    v-model="number"
                    placeholder="Номер"
                />
                <FormulateInput
                    name="transport"
                    :options="transports"
                    type="select"
                    v-model="transport"
                    placeholder="Вид машины"
                />
                <FormulateInput
                    name="materials"
                    :options="materials"
                    type="select"
                    v-model="material"
                    placeholder="Материалы с доставкой"
                />
                <div style="position: relative;">
                    <img v-if="image !== ''" :src="image" alt=""><br>
                    <input @change="fileChangeHandler" type="file">
                    <a>Прикрепить файл</a>
                </div>
                <button type="submit">
                    <span v-if="!edit">Добавить</span>
                    <span v-if="edit">Изменить</span>
                </button>
            </FormulateForm>
            <div class="close" @click="close()"></div>
        </div>
    </div>
</template>

<script>
    import Tabs from './Tabs'
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
        data() {
            return {
                url: 'http://37.46.133.192/',
                values: {},
                transport: '',
                material: '',
                name: '',
                info: '',
                number: '',
                add: false,
                edit: false,
                id: null,
                img: '',
                image: '',
            }
        },
        computed: {
            ...mapGetters([
                'API_TOKEN',
                'TRANSPORTS',
                'MATERIALS',
                'TOKEN'
            ]),            
            transports(){
                return this.repeat(this.TRANSPORTS)
            },
            materials(){
                return this.repeat(this.MATERIALS)
            },
        },
        methods: {
            async action() {
                let formData = new FormData();
                formData.append('token', this.TOKEN);
                formData.append('name', this.values.name);
                formData.append('info', this.values.info);
                formData.append('number', this.values.number);
                formData.append('car_transports[0]', this.values.transport);
                formData.append('car_materials[0]', this.values.materials);
                formData.append('images[0]', this.img); 
                let url = '/driver/car/create';
                if(this.edit){
                    url = '/driver/car/edit';
                    formData.append('car_id', this.id)
                }
                await api.post(url, formData)
                .then(response => {
                    console.log(response);
                    if(response.data.statusCode === 200){
                        this.$store.dispatch('GET_API_TOKEN', this.TOKEN);
                        this.add = false;
                        if(this.edit){
                            this.edit = false;
                            this.id = null;
                        }
                        this.values = {};
                        this.img = this.image = '';
                    }
                })
                .catch(e => {
                    console.log(e.response)
                })
            },
            async deleteCar(id){
                let ask = confirm('');
                if(ask){
                    await api.post('/driver/car/delete', {
                        token: this.TOKEN,
                        car_id: id
                    })
                    .then(response => {
                        console.log(response)
                        this.$store.dispatch('GET_API_TOKEN', this.TOKEN);
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                }
            },
            editCar(car){
                this.edit = true;
                this.id = car.id;
                this.transport = car.car_transports.length > 0 ? car.car_transports[0].id : '';
                this.material = car.car_materials.length > 0 ? car.car_materials[0].id : '';
                this.name = car.name;
                this.info = car.info;
                this.number = car.number;
                this.image = car.images.length > 0 ? this.url + car.images[0].path : ''
                this.add = true;
            },            
            fileChangeHandler(e){
                let files = Array.from(e.target.files);
                this.img = e.target.files[0];
                var images = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.images = e.target.result;
                    this.image = vm.images;
                };
                reader.readAsDataURL(files[0]);
            },
            close(){
                this.values = {};
                this.id = null
                this.img = this.image = '';
                this.edit = false;
                this.transport
                this.material = this.name = this.info = this.number = '';
                this.add = !this.add;
            }
        },
        components: {
            Tabs,
        },
        created () {            
            this.$store.dispatch('GET_TRANSPORTS');
            this.$store.dispatch('GET_MATERIALS');
        },
    }
</script>

<style scoped>
    .transport{
        padding-top: 4%;
    }
    .p18{
        font-weight: bolder;
    }
    .flex p{
        color: #0069c4;
    }
    .cars .flex{
        justify-content: flex-start;
    }
    .cars .flex > figure{
        margin-right: 10px;
    }
    .cars .flex img{
        width: 100px;
    }
    .new{
        position: fixed;
        width: 100%;
        z-index: 2;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 0, .4);
    }
    .new .newForm{
        width: 450px;
        padding: 30px 40px;
        background: #fff;
        border-radius: 4px;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 2;
        max-height: 90vh;
        overflow-y: scroll;
    }
    .close{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
    .newForm a{
        color: #0069c4;
    }
    .newForm button{
        margin-top: 1rem;
        width: 100%;
    }
    button{
        padding: 5px 20px;
        background: none;
        border: 1px solid #eee;
        color: #0069c4;
        font-weight: 500;
        border-radius: 4px;
    }
    .danger{
        background: rgb(252, 59, 0);
        color: #fff;
    }
    .newForm img{
        width: 150px;
        height: 80px;
    }
</style>