<template>
    <div class="new-group">
        <b-container>
            <h2>Создание группы</h2>
            <p class="font-weight-bold p18 mb-0 ">Информации о группе</p>
            <p>Дайте краткие информации о вашей группе</p>
            <FormulateForm
                class="order-form"
                name="signup"
                @submit="newGroup"
                v-model="values"
            >
                <FormulateInput
                    type="text"
                    name="name"
                    v-model="name"
                    placeholder="Название группы"
                    validation="required"
                />
                <button type="submit" class="blueBtn">Создать</button>
            </FormulateForm>
        </b-container>
    </div>
</template>

<script>
    import api from '@/help/api'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                name: '',
                values: {}
            }
        },
        computed: {
            ...mapGetters([
                'TOKEN'
            ])
        },
        methods: {
            newGroup() {
                api.post('/driver/group/create', {
                    token: this.TOKEN,
                    name: this.values.name
                })
                .then(response => {
                    console.log(response)
                    if(response.data.statusCode === 200){
                        this.makeToast('success');
                        this.$router.push('/group/0')
                    }else{
                        this.makeToast('danger', response.data.message);
                    }
                })
                .catch(e => {
                    this.makeToast('danger', response.data.message);
                    console.log(e.response)
                })
            }
        },
    }
</script>

<style scoped>
    .new-group{
        min-height: 80vh;
    }
    h2{
        margin: 3% 0;
    }
    button{
        margin-top: 2%;
    }
</style>