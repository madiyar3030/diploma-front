<template>
    <div class="profile">
        <profile-header :profile="API_TOKEN"></profile-header>
        <profile-about v-if="$route.params.name === 'profile-about'"></profile-about>
        <profile-reviews v-if="$route.params.name === 'profile-reviews'"></profile-reviews>
        <profile-orders v-if="$route.params.name === 'profile-orders'"></profile-orders>
        <profile-transport v-if="$route.params.name === 'profile-transport'"></profile-transport>
    </div>
</template>

<script>
    import ProfileHeader from '@/components/profile/Header'
    import ProfileAbout from '@/components/profile/About'
    import ProfileReviews from '@/components/profile/Reviews'
    import ProfileOrders from '@/components/profile/Orders'
    import ProfileTransport from '@/components/profile/Transport'
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'API_TOKEN'
            ])
        },
        components: {
            ProfileHeader,
            ProfileAbout,
            ProfileReviews,
            ProfileOrders,
            ProfileTransport
        },
    }
</script>

<style lang="scss" scoped>

</style>