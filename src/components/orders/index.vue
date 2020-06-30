<template>
    <div class="order" v-if="order">
        <b-row>
            <div @click="open()" class="col-lg-9 col-md-6 col-12">
                <h3>{{order.description}}</h3>
                <div>
                    <span>{{order.price}} тг</span>&middot;
                    <span v-if="order.date">{{order.date.slice(0, 16)}}</span>&middot;
                    <span>64 час</span>&middot;
                    <span>Алматы</span>
                </div>
            </div>
            <div v-if="order.images.length > 0" class="col-lg-3 col-md-6 col-12 text-right">
                <!-- <img src="@/assets/images/ca760b70976b52578da88e06973af542.jpg" alt=""> -->
                <img :src="order.images[0].path" alt="">
            </div>
        </b-row>
        <b-row>
            <div class="col-md-6 col-12 orders-profile">
                <img src="@/assets/images/profile.jpg" alt="">
                <p>Robert Tate</p>
                <span>
                    <svg style="margin-right: 5px;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08822 0.721634L6.01055 4.84786L1.36204 5.51167C0.52843 5.6301 0.194349 6.63672 0.798877 7.21327L4.16196 10.4233L3.36653 14.9577C3.22335 15.7774 4.10469 16.3913 4.84285 16.008L9.00137 13.867L13.1599 16.008C13.8981 16.3882 14.7794 15.7774 14.6362 14.9577L13.8408 10.4233L17.2039 7.21327C17.8084 6.63672 17.4743 5.6301 16.6407 5.51167L11.9922 4.84786L9.91453 0.721634C9.54227 -0.0138572 8.46366 -0.0232067 8.08822 0.721634Z" fill="#FFCF55"/>
                    </svg>
                    5.0/432
                </span>
            </div>
            <div class="col-md-6 col-12 text-right">
                <div class="mt-2"><small>13:30</small></div>
            </div>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: {
            order: {
                type: Object,
            },
        },
        methods: {
            open() {
                this.$router.push({name: 'order', params: {id: this.order.id.toString(), type: this.order.type.split('_')[0]}})
            }
        },
    }
</script>

<style scoped>
    .order{
        padding: 20px 0;
        border-bottom: 1px solid #d8d8d8;
    }
    .order h3{
        color: rgb(63, 141, 243);
        font-size: 20px;
        margin-bottom: 0;
        cursor: pointer;
    }
    img{
        max-width: 150px;
        max-height: 50px;
    }
    .orders-profile{
        display: flex;
        font-size: 16px;
        align-items: center;
    }
    .orders-profile p{
        margin: 0 10px 0 20px;
        cursor: pointer;
    }
    .orders-profile span{
        font-size: 12px;
    }
    .orders-profile img{
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
    }
</style>