<template>
    <div class="footer">
        <b-container>
            <b-row class="title">
                <div class="col-3">Информация</div>
                <div class="col-1">О нас</div>
                <div class="col-5">Служба поддержки</div>
                <div class="col-3">Скачайте приложение</div>
            </b-row>
            <b-row class="mb-4">
                <div class="col-3">
                    <div><router-link to="info">Как это работает</router-link></div>
                    <div><router-link to="info">Безопасность и гарантии</router-link></div>
                    <div><router-link to="info">Как стать партнером</router-link></div>
                    <div><router-link to="info">Как стать исполнителем</router-link></div>
                </div>
                <div class="col-1">
                    <div><router-link to="info">Об Easy</router-link></div>
                    <div><router-link to="info">Контакты</router-link></div>
                </div>
                <div class="col-5">
                    <div><router-link to="info">Правила сервиса</router-link></div>
                    <div><router-link to="info">Частые вопросы</router-link></div>
                </div>
                <div class="col-3">

                </div>
            </b-row>
            <hr>
            <div class="text-center copy">
                &copy; 2018 Easy. Все права защищены
            </div>
        </b-container>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .footer{
        margin-top: 30px;
        padding: 2% 0 1%;
        background: #1f2635;
        color: #bbb;
    }
    a{
        color: #bbb;
    }
    .title, .title a{
        color: #fff;
    }
    hr{
        background: #bbb;
        margin-top: 20px;
    }
    .copy{
        color: #666;
    }
    a:hover{
        color: inherit;
    }
</style>