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
            <p class="text-sm pt-2 text-gray-600">{{pub[user.uid]}} drinks</p>
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
        <div @click="removePub" class="w-16">
          <img src="../../public/img/icons/arow_back.svg" class="w-8 h-8" alt />
        </div>
      </div>
      <div
        v-if="!loading"
        class="bg-white mx-3 mt-3 relative rounded-t-large"
        style="min-height: calc(100vh - 160px)"
      >
        <div class="py-4 flex text-lg font-bold text-gray-800 justify-center items-center">
          <img class="h-8 w-8 rounded-full mr-3" :src="pub.img" />
          <span @click="getAllBeers">{{ pub.name }}</span>
        </div>
        <div class="px-3 mt-5">
          <p class="text-gray-600 mb-2">Amount of alcohol</p>
          <div class="rounded flex w-full h-12 bg-light-blue justify-between">
            <div
              @click="beerUpdate(-1)"
              class="bg-blue rounded-l flex justify-center items-center w-12 h-12"
            >
              <img src="../../public/img/icons/minus.svg" />
            </div>
            <div class="flex justify-center items-center">
              <img src="../../public/img/icons/beer_color.svg" />
              <span
                v-if="user"
                class="text-lg font-bold text-gray-800 ml-4"
              >{{pub[user.uid]}} drinks</span>
            </div>
            <div
              @click="beerUpdate(1)"
              class="bg-blue rounded-r flex justify-center items-center w-12 h-12"
            >
              <img src="../../public/img/icons/plus.svg" />
            </div>
          </div>
        </div>
        <div class="px-3 mt-5">
          <p class="text-gray-600 mb-2">Total amount of drinks</p>
          <span class="text-lg font-bold text-gray-800">{{beerCount}} drinks</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "../store";
import { mapState, mapMutations } from "vuex";
import state from "../modules/state";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";

export default {
  name: "home",
  data() {
    return {
      beerCount: 0
    };
  },
  methods: {
    getPub(pub) {
      var parsedPub = JSON.parse(JSON.stringify(pub));
      this.$store.commit("state/UPDATE_PUB", parsedPub);
      setTimeout(() => {
        this.getAllBeers();
      }, 400);
    },
    removePub() {
      this.$store.commit("state/REMOVE_PUB");
    },
    beerUpdate(val) {
      this.$store.commit("state/UPDATE_BEER", val);
      const increment = firebase.firestore.FieldValue.increment(val);
      const dbRef = db.collection("pubs").doc(this.pub.id.toString());
      dbRef.update({ [this.user.uid]: increment });
      setTimeout(() => {
        this.getAllBeers();
      }, 400);
    },

    getAllBeers() {
      let beerCount = 0;
      const dbRef = db.collection("pubs").doc(this.pub.id.toString());
      dbRef
        .get()
        .then(function(doc) {
          let json = doc.data();
          Object.keys(json).forEach(name => {
            if (name.length > 20) {
              beerCount += json[name];
            }
          });
        })
        .then(() => {
          this.beerCount = beerCount;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
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
  }
};
</script>

<style lang="scss" scoped></style>
