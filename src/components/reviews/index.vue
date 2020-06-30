<template>
    <div class="review" v-if="review">
        <b-row>
            <div class="col-md-6 col-12">
                <div class="flex">
                    <figure @click="open()" v-if="review.images && review.images.length > 0">
                        <img :src="review.images" alt="">
                    </figure>
                    <figure @click="open()" v-if="review.images.length === 0">
                        <img src="@/assets/images/ca760b70976b52578da88e06973af542.jpg" alt="">
                    </figure>
                    <span @click="open()" class="name" v-if="review.client">{{review.client.name}}</span>
                </div>
            </div>
            <div class="col-md-6 col-12 text-right">
                <svg v-for="item in total" :key="item" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.14168 0.521791L5.18879 4.40022L0.819452 5.02416C0.035902 5.13548 -0.278116 6.08165 0.290107 6.62358L3.45122 9.64078L2.70356 13.9029C2.56898 14.6734 3.39739 15.2504 4.09122 14.8901L8 12.8777L11.9088 14.8901C12.6026 15.2475 13.431 14.6734 13.2964 13.9029L12.5488 9.64078L15.7099 6.62358C16.2781 6.08165 15.9641 5.13548 15.1805 5.02416L10.8112 4.40022L8.85832 0.521791C8.50841 -0.16953 7.49458 -0.178317 7.14168 0.521791Z" fill="#FFCF55"/>
                </svg>

                <svg v-for="(item, index) in 5-total" :key="index + 10" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                    <path d="M15.1805 5.02416L10.8112 4.40022L8.85832 0.521791C8.50841 -0.16953 7.49458 -0.178317 7.14168 0.521791L5.18879 4.40022L0.819452 5.02416C0.035902 5.13548 -0.278116 6.08165 0.290107 6.62358L3.45122 9.64078L2.70356 13.9029C2.56898 14.6734 3.39739 15.2504 4.09122 14.8901L8 12.8777L11.9088 14.8901C12.6026 15.2475 13.431 14.6734 13.2964 13.9029L12.5488 9.64078L15.7099 6.62358C16.2781 6.08165 15.9641 5.13548 15.1805 5.02416ZM11.0086 9.14865L11.7174 13.2028L8 11.29L4.28262 13.2028L4.99141 9.14865L1.98281 6.27792L6.13982 5.68619L8 1.99524L9.86018 5.68619L14.0172 6.27792L11.0086 9.14865Z" fill="#CED4DA"/>
                </svg>
                {{total}}.0
            </div>
        </b-row>
        <p>{{review.description}}</p>
        <div class="text-right" v-if="review.created_at">
            <small v-if="review.created_at.date">{{review.created_at.date.slice(11, 16)}}</small>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            review: {
                type: Object
            },
        },
        computed: {
            total() {
                let price = parseInt((this.review.speed + this.review.punctuality + this.review.quality + this.review.price) / 4);
                return price;
            }
        },
        methods: {
            open() {
                console.log('Думаю открыть, но ...')
            }
        },
    }
</script>

<style scoped>
    .name{
        color: #0069c4;
        font-weight: 500;
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
    }
    .flex{
        justify-content: flex-start;
    }
    .flex figure{
        margin-right: 10px;
        align-items: center;
        margin-bottom: 0;
    }
    small{
        color: #bbb;
    }
    svg{
        margin-left: 5px;
    }
</style>