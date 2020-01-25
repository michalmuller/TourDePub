import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Slider from './views/Slider.vue';
import Profile from './views/Profile.vue';
import CameraView from '@/components/CameraView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'redirect',
      component: Home,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/slider',
      name: 'slider',
      component: Slider,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/camera',
      name: 'camera',
      component: CameraView,
    },
  ],
});
