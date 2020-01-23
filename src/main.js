import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.config.productionTip = false;

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`).then(() => {
//     console.log("SW registered");
//   });
// }

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app');
