import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFormulate from '@braid/vue-formulate'
import mixin from './mixin/mixin'
import * as VueGoogleMaps from 'vue2-google-maps'
import '@/assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
// import socketio from 'socket.io';
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:8080');

Vue.config.productionTip = false



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormulate)
Vue.use(VueGoogleMaps, {
  load: {
    // key: 'AIzaSyBDYUi9nox54qtCdlkGpU1C_VzULNkjmfg',
    key: 'AIzaSyBhFliSpjTKO3hamDSHMFz8JmbAj7Nwe9U',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    installComponents: true
  },
})

// Vue.use(VueSocketIO, SocketInstance)



Vue.mixin(mixin)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.dispatch('GET_TOKEN');
    store.dispatch('GET_AUTH');
    store.dispatch('GET_TYPE');
  },
}).$mount('#app')
