<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '@/components/header/'
  import AppFooter from '@/components/footer/'
  export default {
    components: {
      AppHeader,
      AppFooter
    },
  }
</script>

<style>
</style>
