<template>
  <div class="m-6">
    <h1 class="mb-3" v-if="user">
      Nickname: <span class="font-bold">{{ user.displayName }} </span>
    </h1>
    <h1 class="mb-3" v-if="user">
      Email: <span class="font-bold">{{ user.email }} </span>
    </h1>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="signOut"
    >
      Logout
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import firebase from 'firebase';
export default {
  name: 'Profile',
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.logout();
        })
        .then(() => {
          this.$router.replace('home');
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapMutations('user', ['LOGOUT_USER']),
    logout() {
      this.LOGOUT_USER();
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>

<style lang="scss"></style>
