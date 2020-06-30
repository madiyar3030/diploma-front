<template>
    <div>
        <p class="font-weight-bold p18">Количество:</p>
        <div class="flex">
            <FormulateInput
                class="mr-4"
                name="count"
                type="text"
                placeholder="Количество"
            />
            <FormulateInput
                :options="count_types"
                type="select"
                placeholder="тип"
                name="count_types"
            />
        </div>
        <div class="flex">
            <FormulateInput
                class="mr-4"
                name="volume"
                type="text"
                placeholder="Вес"
            />
            <FormulateInput
                :options="count_types"
                type="select"
                placeholder="тип"
                name="type_volume"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'CITIES',
                'COUNT_TYPES',
            ]),
            cities(){
                return this.repeat(this.CITIES)
            },
            count_types(){
                return this.repeat(this.COUNT_TYPES)
            },
        },        
        created () {
            this.$store.dispatch('GET_CITIES');
            this.$store.dispatch('GET_COUNT_TYPES');
        },
    }
</script>

<style scoped>

</style>