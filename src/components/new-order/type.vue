<template>
    <div>
        <p class="font-weight-bold p18 mb-0 mt-4">Выберите услугу</p>
        <p>Выберите услугу для заказа</p>
        <div class="flex">
            <FormulateInput
                class="mr-4"
                name="service"
                :options="{service: 'Услуги спец.техники', transport: 'Перевозка грузов', material: 'Материалы с доставкой'}"
                type="select"
                placeholder="Вы не выбрали"
                v-model="select_type"
            />
            <FormulateInput
                v-if="type !== 'material'"
                class="mr-4"
                name="transport"
                :options="type === 'service' ? transports : transports2"
                type="select"
                v-model="transport"
                placeholder="Вид машины"
            />
            <FormulateInput
                v-if="type !== 'material'"
                name="transport_type"
                :options="transport_type"
                type="select"
                v-model="massa"
                placeholder="Вес"
            />
            <FormulateInput
                v-if="type === 'material'"
                class="mr-4"
                name="materials"
                :options="materials"
                type="select"
                v-model="material"
                placeholder="Материалы с доставкой"
            />
            <FormulateInput
                v-if="type === 'material'"
                name="material_types"
                v-model="volume"
                :options="material_types"
                type="select"
                placeholder="Объем"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            type: {
                type: String,
            },
        },
        data() {
            return {
                select_type: this.type,
                transport: null,
                massa: '',
                material: [],
                volume: []
            }
        },
        computed: {
            ...mapGetters([
                'TRANSPORTS',
                'TRANSPORTS2',
                'TRANSPORT_TYPES',
                'MATERIALS',
                'MATERIAL_TYPES'
            ]),
            transports(){
                return this.repeat(this.TRANSPORTS)
            },
            transports2(){
                return this.repeat(this.TRANSPORTS2)
            },
            transport_type(){
                return this.repeat(this.TRANSPORT_TYPES)
            },
            materials(){
                return this.repeat(this.MATERIALS)
            },
            material_types(){
                return this.repeat(this.MATERIAL_TYPES)
            },
        },
        methods: {
            changer() {
                console.log(this.type)
                this.$router.push({name: 'new-order', params: {name: this.type}})
            },
            
        },
        mounted () {
            this.transport = null;
            this.massa = null;
            this.material = null;
            this.volume = null;
        },
        created () {
            this.$store.dispatch('GET_TRANSPORTS');
            this.$store.dispatch('GET_TRANSPORTS2');
            this.$store.dispatch('GET_TRANSPORT_TYPES');
            this.$store.dispatch('GET_MATERIALS');
            this.$store.dispatch('GET_MATERIAL_TYPES');
        },
        watch: {
            select_type() {
                this.$router.push({name: 'new-order', params: {name: this.select_type}})
                this.transport = null;
                this.massa = null;
                this.material = null;
                this.volume = null;
            }
        },
    }
</script>

<style scoped>

</style>