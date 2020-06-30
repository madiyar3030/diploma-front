<template>
    <div class="sign">
        <b-container>
            <sign-in v-if="$route.params.name === 'signin'"></sign-in>
            <sign-up v-if="$route.params.name === 'signup'"></sign-up>
            <sign-code v-if="$route.params.name === 'code'"></sign-code>
        </b-container>
    </div>
</template>

<script>
    import SignIn from '@/components/sign/signin'
    import SignUp from '@/components/sign/signup'
    import SignCode from '@/components/sign/code'
    export default {
        components: {
            SignIn,
            SignUp,
            SignCode
        },
    }
</script>

<style scoped>
    select{
        width: 100%;
    }
</style>