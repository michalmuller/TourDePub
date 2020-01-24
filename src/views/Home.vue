<template>
  <div id="home">
    <div id="header" class="h-40 w-full bg-gradient-primary z-10 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:52%" />
      <h1 class="pt-12 relative px-6 text-2xl font-bold text-white">JBC Tour De Pub</h1>
    </div>

    <div class="px-3" style="padding-top: 172px">
      <div v-show="loading">loading ...</div>
      <div v-if="!loading">
        <div v-for="(pub, index) in pubs" :key="index">
          <router-link
            :to="{ name: 'pub', params: { id: pub.name }}"
            class="bg-white rounded shadow-md w-full mt-3 flex relative"
          >
            <img :src="pub.img" :alt="pub.name" class="rounded-l h-20 w-20" />
            <div class="pl-3 truncate w-full">
              <h1
                class="text-lg font-bold text-gray-800 pt-3 truncate"
                style="max-width:88%"
              >{{pub.name}}</h1>
              <p class="text-sm pt-2 text-gray-600">0 drinks</p>
            </div>
            <div class="absolute h-full flex items-center" style="right:12px">
              <img src="../../public/img/icons/arrow_card.png" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "../store";
import { mapState, mapMutations } from "vuex";
import user from "../modules/user";
import state from "../modules/state";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user,
      pubs: state => state.state.pubs,
      loading: state => state.state.loading
    })
  },
  created() {
    if (this.loading) {
      let pubs = [];
      db.collection("pubs")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            pubs.push(doc.data());
          });
        })
        .then(() => {
          this.$store.commit("state/LOADING", false);
          this.$store.commit("state/UPDATE_PUBS", pubs);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
