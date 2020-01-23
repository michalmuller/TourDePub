<template>
  <div id="app">
    <div v-if="!user">
      no user
      <login></login>
    </div>
    <router-view />
    <div v-if="user">
      <navbar></navbar>
      <div class="bg-transparent" style="height: 56px"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import db from '@/firebase/firebaseInit';
import firebase from 'firebase';
import Navbar from '@/components/Nav.vue';
import Login from '@/views/Login.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: { Navbar, Login },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>

<style lang="scss">
@import '../node_modules/tailwindcss/dist/base.css';
@import '../node_modules/tailwindcss/dist/components.css';
@import '../node_modules/tailwindcss/dist/utilities.css';

@import url('https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap');

html {
  margin: 0 !important;
}
body {
  background-color: #fafafa;
  font-family: 'Raleway', sans-serif;
  margin: 0 !important;
}
</style>
