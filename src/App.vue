<template>
  <div id="app">
    <div v-if="!user">
      <login></login>
    </div>
    <router-view v-if="user" />
    <div v-if="user">
      <navbar></navbar>
      <div class="bg-transparent" style="height: 64px"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import db from "@/firebase/firebaseInit";
import firebase from "firebase";
import Navbar from "@/components/Nav.vue";
import Login from "@/views/Login.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: { Navbar, Login },
  methods: {
    log() {
      console.log("logged");
    },
    callPubs() {
      let pubs = [];
      this.$store.commit("state/LOADING", true);
      db.collection("pubs")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            pubs.push(doc.data());
          });
          console.log("DB called");
        })
        .then(() => {
          this.$store.commit("state/LOADING", false);
          this.$store.commit("state/UPDATE_PUBS", pubs);
        })
        .catch(err => {
          console.log(err);
        });
      db.collection("users")
        .doc(this.user.uid)
        .get()
        .then(doc => {
          console.log(doc.data());
          this.$store.commit("state/MERGE_USERS", doc.data());
        });
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user,
      pubs: state => state.state.pubs,
      pub: state => state.state.pub,
      loading: state => state.state.loading
    })
  },
  created() {
    if (this.loading) {
      this.callPubs();
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap");

html {
  margin: 0 !important;
}
body {
  background-color: #edf2f8;
  font-family: "Montserrat", sans-serif;
  margin: 0 !important;
}
</style>
