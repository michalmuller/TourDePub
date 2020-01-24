<template>
  <div id="home">
    <div class="flex flex-wrap">
      <div class="bg-dark-pink">smile</div>
      <div v-for="i in 10" :key="i" class="h-40 border w-1/2">
        <div class>lorem ipsum</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store';
import { mapState, mapMutations } from 'vuex';
import user from '../modules/user';
import state from '../modules/state';
import firebase from 'firebase';
import db from '@/firebase/firebaseInit';

export default {
  name: 'home',
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user,
      loading: state => state.state.loading,
    }),
  },
  created() {
    if (this.loading) {
      let pubs = [];
      db.collection('pubs')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .then(() => {
          this.$store.commit('state/LOADING', false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="scss" scoped></style>
