<template>
  <div id="home">
    <div id="header" class="h-40 w-full bg-gradient-primary z-10 top-0 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:52%" />
      <h1 v-show="!pub" class="pt-12 relative px-6 text-2xl font-bold text-white">JBC Tour De Pub</h1>
    </div>

    <!----------- Home Screen ------------>
    <div v-show="!pub" class="px-3" style="padding-top: 172px">
      <div v-show="loading">loading ...</div>
      <div v-if="!loading">
        <div
          v-for="(pub, index) in pubs"
          :key="index"
          @click="getPub(pub)"
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
        </div>
      </div>
    </div>

    <!----------- One Pub Screen ------------>
    <div v-if="pub" class="mt-8 relative z-20">
      <div class="px-6 py-3 w-20 z-30">
        <div @click="pub=null" class="w-16">
          <img src="../../public/img/icons/arow_back.svg" class="w-8 h-8" alt />
        </div>
      </div>
      <div
        class="bg-white mx-3 mt-3 relative rounded-t-large"
        style="min-height: calc(100vh - 160px)"
      >
        <div class="py-4 flex text-lg font-bold text-gray-800 justify-center items-center">
          <img class="h-8 w-8 rounded-full mr-3" :src="pub.img" />
          <span>{{ pub.name }}</span>
        </div>
        <div class="px-3 mt-5">
          <p class="text-gray-600 mb-2">Amount of alcohol</p>
          <div class="rounded flex w-full h-12 bg-light-blue justify-between">
            <div class="bg-blue rounded-l flex justify-center items-center w-12 h-12">
              <img src="../../public/img/icons/minus.svg" />
            </div>
            <div class="flex justify-center items-center">
              <img src="../../public/img/icons/beer_color.svg" />
              <span class="text-lg font-bold text-gray-800 ml-4">3 drinks</span>
            </div>
            <div class="bg-blue rounded-r flex justify-center items-center w-12 h-12">
              <img src="../../public/img/icons/plus.svg" />
            </div>
          </div>
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
    return {
      pub: null
    };
  },
  methods: {
    getPub(pub) {
      var parsedPub = JSON.parse(JSON.stringify(pub));
      this.pub = parsedPub;
      console.log(parsedPub);
    }
  },
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
          console.log("DB called");
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
