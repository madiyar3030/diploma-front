export default {
    methods: {
        repeat(name){
            let type = {};
            try {
                name.forEach(element => {
                    type[element.id] = element.name;
                }); 
            } catch (error) {
                type = [];
                console.log(error.message)
            }            
            return type
        },        
        makeToast(variant = null, text = 'Успешно!') {
            this.$bvToast.toast(text, {
            title: 'Сообщение!',
            variant: variant,
            solid: true
            })
        }
    },
}