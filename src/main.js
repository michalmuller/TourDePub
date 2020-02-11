import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import '@/assets/css/tailwind.css';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.config.productionTip = false;

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`).then(() => {
//     console.log("SW registered");
//   });
// }

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
  installComponents: true
})

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app');
