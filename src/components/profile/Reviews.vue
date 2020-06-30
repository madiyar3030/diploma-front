<template>
    <div class="reviews">
        <b-container>
            <tabs></tabs>
            <div>
                <!-- <div class="flex mt-5">
                    <div class="flex">
                        <figure>
                            <img src="@/assets/images/profile.jpg" alt="">
                        </figure>
                        <p class="name">Leon Briggs</p>
                    </div>
                    5.0
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, amet sed nemo praesentium, 
                    architecto perferendis tempora, blanditiis velit quasi reiciendis ratione quis nisi natus nostrum? Libero sapiente vel beatae similique.
                </p>
                <div class="text-right"><small>в 13:30</small></div> -->
                    <app-review></app-review>
                <hr>
            </div>
        </b-container>
    </div>
</template>

<script>
    import Tabs from './Tabs'
    import AppReview from '@/components/reviews/'
    export default {
        components: {
            Tabs,
            AppReview
        },
    }
</script>

<style scoped>
    .reviews{
        padding-top: 4%;
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
    }
    .name{
        color: skyblue;
        margin-left: 10px;
    }
    .flex{
        align-items: center;
    }
</style>