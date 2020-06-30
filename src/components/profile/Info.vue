<template>
    <div class="profile-info">
        <b-container v-if="profile">
            <b-row>
                <div class="col-2">
                    <figure>
                        <img style="cursor: pointer;" @click="open()" :src="url + profile.avatar" alt="">
                        <!-- <img src="@/assets/images/profile.jpg" alt=""> -->
                    </figure>
                </div>
                <div class="col-10">
                    <div class="flex">
                        <div>
                            <p @click="open()" style="cursor: pointer;" class="p18 mb-0 name">{{profile.name}}</p>
                            <svg style="margin-right: 5px;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.08822 0.721634L6.01055 4.84786L1.36204 5.51167C0.52843 5.6301 0.194349 6.63672 0.798877 7.21327L4.16196 10.4233L3.36653 14.9577C3.22335 15.7774 4.10469 16.3913 4.84285 16.008L9.00137 13.867L13.1599 16.008C13.8981 16.3882 14.7794 15.7774 14.6362 14.9577L13.8408 10.4233L17.2039 7.21327C17.8084 6.63672 17.4743 5.6301 16.6407 5.51167L11.9922 4.84786L9.91453 0.721634C9.54227 -0.0138572 8.46366 -0.0232067 8.08822 0.721634Z" fill="#FFCF55"/>
                            </svg>
                            <small>{{total}}</small>
                        </div>
                        <div v-if="profile.price"><strong>{{profile.price}} тг</strong></div>
                    </div>
                    <div class="flex">
                        <div>
                            <p v-if="profile.rang" class="mt-1 mb-0">{{profile.rang.name}}</p>
                            <small>{{profile.created_at}}</small>
                        </div>
                        <div v-if="profile.rang && TYPE === 'client'">
                            <button @click="$emit('accept', profile.offer_id)">Принят</button>
                        </div>
                    </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: {
            profile: {
                type: Object
            },
            client: {
                type: Boolean
            }
        },
        data() {
            return {
                url: 'http://37.46.133.192/'
            }
        },
        computed: {
            total() {
                let price = 0
                if(this.profile.reviews_all){
                    price = parseInt((this.profile.reviews_all.speed + this.profile.reviews_all.punctuality + this.profile.reviews_all.quality + this.profile.reviews_all.price) / 4);
                }
                return price;
            },
            ...mapGetters([
                'TYPE'
            ])
        },
        methods: {
            open() {
                // console.log(this.$route.params.type, this.profile.offer_id.toString(), this.profile.id.toString())
                this.$router.push({
                    name: 'client', 
                    params: {
                        type: this.$route.params.type, 
                        client: this.client.toString() || false,
                        offer_id: this.profile.offer_id ? this.profile.offer_id.toString() : 'null', 
                        id: this.profile.id.toString()
                    }
                })
            }
        },
    }
</script>

<style scoped>
    img{
        width: 100px;
        height: 100px;
        border-radius: 50% 50%;
    }
    .flex p{
        font-size: 14px;
    }
    .flex .p18{
        font-size: 18px;
    }
    button{
        padding: 3px 1.2rem;
        border: 1px solid #ddd;
        color: #026ac4;
        background: #fff;
    }
    small{
        color: #9f9f9f;
    }
</style>