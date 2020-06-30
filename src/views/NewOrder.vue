<template>
    <div class="new-order">
        <b-container>
            <h2>Новый заказ</h2>
            <FormulateForm
                class="order-form"
                name="newOrder"
                @submit="newOrder"
                v-model="values"
            >
                <type :type="$route.params.name" ></type>
                <addresses></addresses>
                <volume v-if="$route.params.name !== 'service'"></volume>
                <p class="font-weight-bold p18 mb-0 mt-4">Предложите цену?</p>
                <p>Укажите сумму для вознограждения</p>
                <div class="flex">
                    <FormulateInput
                        class="mr-4"
                        name="price"
                        type="text"
                        placeholder="1000"
                    />
                    <FormulateInput
                        name="valute"
                        :options="{1: 'тг', 2: 'рубль', 3: 'доллар'}"
                        type="select"
                        placeholder="валюта"
                    />
                </div>
                <p class="font-weight-bold p18 mb-0 mt-4">Описание задачи</p>
                <FormulateInput
                    type="textarea"
                    name="description"
                    validation="required"
                    validation-name="Характеристика"
                />
                <div style="position: relative;">
                    <!-- <FormulateInput
                        type="image"
                        name="image"
                        validation="mime:image/jpeg,image/png,image/gif"
                    /> -->
                    <img v-for="(item, index) in image" :key="index" :src="item" alt=""><br>
                    <input type="file" @change="fileChangeHandler">
                    <a>Прикрепить файл</a>
                </div>
                <button type="submit" class="blueBtn">Отправить</button>
            </FormulateForm>
        </b-container>
    </div>
</template>

<script>
    import Type from '@/components/new-order/type'
    import Addresses from '@/components/new-order/address'
    import Volume from '@/components/new-order/volume'
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
        data() {
            return {
                values: {},
                img: [],
                image: []
            }
        },
        computed: {
            ...mapGetters([
                'TOKEN'
            ]),
        },
        methods: {
            newOrder () {
                let formData = new FormData();
                formData.append('token', this.TOKEN);
                formData.append('date', this.values.date);
                formData.append('price', this.values.price);
                formData.append('description', this.values.description);


                formData.append('size', this.values.volume)
                formData.append('weight', this.values.type_volume)

                
                
                formData.append('hour', this.values.hour);
                formData.append('to_lat', this.values.to_lat);
                formData.append('to_lng', this.values.to_lng);
                formData.append('to_text', this.values.to);
                formData.append('from_lat', this.values.from_lat);
                formData.append('from_lng', this.values.from_lng);
                formData.append('from_text', this.values.from);
                for (let i = 0; i < this.img.length; i++) {
                    formData.append('images[' + i + ']', this.img[i]);
                }

                let url = ''


                if(this.$route.params.name === 'service'){
                    formData.append('transport_id', this.values.transport);
                    formData.append('transport_type_id', this.values.transport_type);
                    formData.append('date_1', this.values.date);
                    

                    url = '/order/service/create'
                }
                else if(this.$route.params.name === 'transport'){
                    formData.append('transport_id', this.values.transport);
                    formData.append('from', this.values.from);
                    formData.append('from_city_id', this.values.cities);
                    // formData.append('from_text', this.values.from);
                    formData.append('to[0][to]', this.values.to);
                    formData.append('to[0][city_id]', this.values.to_city_id);
                    url = '/order/shipping/create'
                }
                else if(this.$route.params.name === 'material'){                    
                    formData.append('material_id', this.values.materials);
                    formData.append('material_type_id', this.values.material_types);
                    formData.append('date', this.values.date);
                    formData.append('count', this.values.count);
                    formData.append('count_type_id', this.values.count_types);
                    url = '/order/item/create'
                }

                console.log('asfjsdfsdjfjb')
                api.post(url, formData)
                .then(response => {
                    console.log(response)
                    if(response.data.statusCode !== 400){
                        this.makeToast('success');
                        this.$router.push('/')
                    }else{
                        this.makeToast('success', response.data.message);
                    }
                })
                .catch(e => {
                    console.log(e.response)
                    this.makeToast('danger', e.response);
                })
            },            
            fileChangeHandler(e){
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
            },
        },
        components: {
            Type,
            Addresses,
            Volume
        },
        created () {
            
        },
        
    }
</script>

<style>
    .new-order h2{
        margin: 4% 0 4%;
    }
    .new-order ol{
        padding-left: 18px;
    }
    .new-order button{
        margin-top: 5%;
    }
    .new-order a{
        color: rgb(18, 109, 194);
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 1px dashed skyblue;
        font-weight: bolder;
    }
    .new-order .flex{
        display: flex;
        justify-content: flex-start;
    }
    .new-order img{
        width: 150px;
        height: 80px;
    }
</style>