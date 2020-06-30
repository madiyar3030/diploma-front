<template>
    <div class="col-md-3 col-12 filter">
        <div>
            <p>Вы выбрали</p>
            <div v-for="(item, index) in filter" :key="index">
                <div class="my-filter" v-for="(i, num) in item" :key="i.id">
                    <span>
                        <b-icon @click="item.splice(num, 1), show()" title="Группа" class="mr-2" icon="x"></b-icon>
                    </span>{{i.name}} {{i.id}}
                </div>
            </div>
        </div>
        <div class="city">
            <p>Искать в городе:</p>
            <div class="flex allotted">
                <div v-for="item in CITIES" :key="item.id">{{item.name}}</div>
                <!-- <span>x</span> -->
            </div>
            <!-- <div class="else">Ещё 24</div> -->
        </div>
        <!-- <div class="find">
            <p>Искать в разделе:</p>
            <div>Спец. техники</div>
            <div>Перевозка грузов</div>
            <div>Материалы с доставкой</div>
        </div> -->
        <div class="find">
            <p>Вид машины:</p>
            <div @click="addFilter('transports', item.id, item.name)" v-for="item in TRANSPORTS" :key="item.id">
                {{item.name}}
            </div>
            <div @click="addFilter('transports', item.id, item.name)" v-for="item in TRANSPORTS2" :key="item.id">
                <div>{{item.name}}</div> <!--span>324</span-->
            </div>
        </div>
        <div class="find">
            <p>Материал с доставкой:</p>
            <div @click="addFilter('materials', item.id, item.name)" v-for="item in MATERIALS" :key="item.id">
                {{item.name}} <!--span>324</span-->
            </div>
        </div>
        <!-- <div class="else">Ещё 24</div> -->
        <!-- <p class="mt-3"><strong>Цена</strong></p>
        <div class="price">
            От <input v-model="min" type="number"> тг
        </div>
        <div class="price">
            До <input v-model="max" type="number"> тг
        </div> -->
        <button @click="show()" class="blueBtn">Показать</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    // import api from '@/help/api'
    export default {
        props: {
            name: {
                type: String
            },
        },
        data() {
            return {
                min: 0,
                max: 2000,
                page: 1,
                filter: {
                    transports: [],
                    materials: []
                }
            }
        },
        computed: {
            ...mapGetters([
                'CITIES',
                'TRANSPORTS',
                'TRANSPORTS2',
                'TOKEN',
                'TRANSPORT_TYPES',
                'MATERIALS',
            ])
        },
        methods: {
            async show(){
                let arr = '';
                let formData = new FormData();
                formData.append('token', this.TOKEN);
                formData.append('page', this.page);
                formData.append('city_id', 1);
                // formData.append('transports', this.TOKEN);
                for (let i = 0; i < this.filter.transports.length; i++) {
                    arr = 'transports' + this.filter.transports[i].id + '/' + this.filter.transports[i].name;
                    formData.append('transports[' + i + ']', this.filter.transports[i].id)
                }
                for (let i = 0; i < this.filter.materials.length; i++) {
                    arr = 'materials' + this.filter.transports[i].id + '/' + this.filter.transports[i].name;
                    formData.append('materials[' + i + ']', this.filter.materials[i].id)
                }
                this.$store.dispatch('GET_LISTS', formData)
                console.log(arr)
                // this.$router.push({name: 'orders', params: {name: arr}})
            },
            addFilter(type, id, name){
                if(type === 'transports') {
                    this.filter.transports.push({id: id, name: name})
                    this.show()
                }
                else if(type === 'materials') {
                    this.filter.materials.push({id: id, name: name})
                    this.show()
                }
                // else if(type === 'types') {
                //     this.filter.types.push({id: id, name: name})
                //     this.show()
                // }
            }
        },
        created () {
            // if(name != '0')
            //     this.filter = name
            this.$store.dispatch('GET_CITIES');
            this.$store.dispatch('GET_TRANSPORTS');
            this.$store.dispatch('GET_TRANSPORTS2');
            this.$store.dispatch('GET_TRANSPORT_TYPES');
            this.$store.dispatch('GET_MATERIALS');
            this.$store.dispatch('GET_MATERIAL_TYPES');
        },
    }
</script>

<style scoped>
    .filter > div > div{
        cursor: pointer;
    }
    .allotted{
        background: #eeeeee;
        padding: 3px 10px;
    }
    .allotted span{
        color: #929292;
    }
    .city > div:not(.else) {
        font-weight: bold;
    }
    .city > p, .find > p, .filter p{
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #000;
    }
    .city span, .find span{
        color: #a8a8a8;
    }
    .find > p{
        margin-top: 1.5rem;
    }
    .find{
        color: #0069c4;
    }
    .else{
        color: #a8a8a8;
        margin-top: 1rem;
    }
    .price{
        margin-bottom: 10px;
    }
    .filter input{
        max-width: 100px;
        padding: 3px 0 3px 10px;
        margin-left: 5px;
    }
    .my-filter{
        font-size: 18px;

    }
    .my-filter > span{
        font-size: 20px;
        color: red;
    }
</style>