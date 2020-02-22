<template>
  <div id="home">
    <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
    </div>

    <!----------- Home Screen ------------>
    <div v-show="!pub" class="w-full fixed z-20">
      <div class="px-3 pb-2 mt-6 w-full z-30 flex justify-between items-center">
        <h1 v-show="!pub" class="relative pl-3 text-2xl font-bold text-white">Tour De Pub</h1>
        <img
          v-show="!pub"
          class="h-7 pl-2 pr-2 mr-1"
          src="../../public/img/icons/map.svg"
          @click="showMap"
        />
      </div>
      <div
        class="bg-white mx-3 relative rounded-t-large shadow-md"
        style="min-height: calc(100vh - 100px)"
      >
        <div class="pt-8 ml-3" v-show="loading">loading ...</div>

        <div v-if="!loading" class="pb-3 pt-4 flex justify-center items-center text-center w-full">
          <p class="text-gray-800 text-2xl font-bold">JBC Team</p>
        </div>
        <div class="overflow-scroll pb-4 pt-2 px-3" style="height: calc(100vh - 184px) !important">
          <div
            v-for="(pub, index) in pubs"
            :key="index"
            @click="getPub(pub)"
            class="bg-medium-blue shadow-sm rounded items-center w-full mb-3 py-2 flex relative"
          >
            <img :src="pub.img" :alt="pub.name" class="rounded-full ml-2 h-10 w-10" />
            <div class="pl-4 truncate w-full">
              <h1 class="font-bold text-gray-800 truncate" style="max-width:95%">{{ pub.name }}</h1>
              <div class="flex">
                <div v-if="pub[user.uid].challenge" class="flex font-semibold items-end mr-6">
                  <img class="h-6 w-6 pb-1" src="../../public/img/icons/challenge.svg" alt />
                </div>
                <div
                  v-if=" pub.beer_total> 0"
                  class="text-lg text-gray-700 flex font-semibold items-center mr-6"
                >
                  <span>{{ pub.beer_total }}</span>
                  <img class="h-6 w-6" src="../../public/img/icons/beer_color_bg_blue.svg" alt />
                </div>
                <div v-if="pub.images" class="text-lg text-gray-700 flex font-semibold items-end">
                  <span class="mr-2">{{ pub.images.length }}</span>
                  <img class="h-6 w-6 pb-1" src="../../public/img/icons/img.svg" alt />
                </div>
              </div>
            </div>
            <div>
              <img src="../../public/img/icons/arrow_leaderboard.svg" class="mr-4 rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!----------- One Pub Screen ------------>
    <div v-if="pub" class="w-full fixed z-20">
      <div class="progress-container">
        <progress :value="percentage" max="100">{{ percentage }}%</progress>
      </div>
      <div class="px-6 pt-4 pb-2 mt-1 w-full z-30 flex justify-between">
        <div @click="removePub">
          <img src="../../public/img/icons/arow_back.svg" class="h-6" />
        </div>
        <div class="w-12">
          <input
            type="file"
            name="file"
            id="file"
            style="display:none"
            @change="uploadImage($event.target.files[0])"
          />
          <label id="choose-file" for="file">
            <img src="../../public/img/icons/camera.svg" class="ml-4 w-7 h-7" />
          </label>
        </div>
      </div>
      <div
        v-if="!loading"
        class="bg-white mx-3 relative rounded-t-large"
        style="min-height: calc(100vh - 200px); margin-top:6px"
      >
        <div class="py-4 flex text-lg font-bold text-gray-800 justify-center items-center">
          <img class="h-8 w-8 rounded-full mr-3" :src="pub.img" />
          <span>{{ pub.name }}</span>
        </div>
        <div class="overflow-scroll pb-4" style="height: calc(100vh - 190px) !important">
          <div class="px-3 mt-5 relative">
            <span class="text-md text-gray-600">Total for JBC Team</span>
            <div class="rounded flex w-full h-12 bg-light-blue mt-2">
              <div class="flex items-center ml-3">
                <img class="w-3" src="../../public/img/icons/beer_color_bg_blue.svg" />
                <span class="text-lg font-bold text-gray-800 ml-2">{{ pub.beer_total }} drinks</span>
              </div>

              <div class="flex items-center ml-6">
                <img class="w-6" src="../../public/img/icons/img.svg" />
                <span
                  class="text-lg font-bold text-gray-800 ml-2"
                >{{ pub.images ? pub.images.length: '0' }} photos</span>
              </div>
            </div>
          </div>

          <div class="px-3 mt-5 relative">
            <div class="flex items-center">
              <span class="text-md text-gray-600">Challenge</span>
              <span class="text-xs ml-2 text-gray-500">({{pub.challenge_points}} points)</span>
            </div>
            <transition name="challenge">
              <img
                v-show="pub[user.uid].challenge"
                class="absolute right-0 top-0 mt-2 h-6 mr-5"
                src="../../public/img/icons/challenge.svg"
              />
            </transition>
            <div class="rounded flex w-full py-3 bg-light-blue relative z-10 mt-2">
              <div class="flex ml-3">
                <checkbox v-model="pub[user.uid].challenge" @change="updateChallenge"></checkbox>
                <span class="font-bold text-sm text-gray-800 ml-2">{{pub.challenge}}</span>
              </div>
            </div>
          </div>
          <div class="px-3 mt-6">
            <div class="flex items-center mb-2">
              <span class="text-gray-600">Your contribution</span>
              <span class="text-xs ml-2 text-gray-500">(160 - 200 points)</span>
            </div>
            <div class="rounded flex w-full h-12 bg-light-blue justify-between">
              <div
                @click="beerUpdate(-1, -180, -220)"
                class="bg-blue rounded-l flex justify-center items-center w-12 h-12"
              >
                <img src="../../public/img/icons/minus.svg" />
              </div>
              <div class="flex justify-center items-center">
                <img src="../../public/img/icons/beer_color_bg_blue.svg" />
                <span
                  v-if="user"
                  class="text-lg font-bold text-gray-800 ml-4"
                >{{ pub[user.uid].beer }} drinks</span>
              </div>
              <div
                @click="beerUpdate(1, 160, 200)"
                class="bg-blue rounded-r flex justify-center items-center w-12 h-12"
              >
                <img src="../../public/img/icons/plus.svg" />
              </div>
            </div>
          </div>

          <div class="px-3 mt-6">
            <div class="mb-2 flex items-center">
              <span class="text-gray-600">Gallery</span>
              <span class="text-xs ml-2 text-gray-500">(5 - 10 points)</span>
            </div>
            <p class="text-gray-800" v-if="imgReload">loading, have a beer ...</p>
            <p
              v-if="!pub.images && !imgReload"
              class="text-sm text-gray-800"
            >Add photos to gallery by clicking camera icon in the top</p>
            <div v-if="!imgReload && pub.images && pub.images.length > 0" class="flex flex-wrap">
              <div
                v-for="(img, index) in pub.images"
                :key="index"
                @click="showImageModal(index)"
                class="border-2 border-white w-1/2"
              >
                <img class="object-cover h-40 w-full" :src="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :index="currentImage" :images="pub.images" v-if="imageModal"></modal>
    <map-modal :pubs="pubs" v-if="mapModal"></map-modal>
    <onboarding v-if="user.onboarding"></onboarding>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "../store";
import { mapState, mapMutations } from "vuex";
import state from "../modules/state";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
import Modal from "../components/Modal";
import MapModal from "../components/MapModal";
import Checkbox from "../components/Checkbox.vue";
import Onboarding from "../components/Onboarding.vue";

export default {
  name: "home",
  components: { Modal, MapModal, Checkbox, Onboarding },
  data() {
    return {
      mapModal: false,
      imageModal: false,
      currentImage: 0,
      uploaded: true,
      percentage: 0,
      imgReload: false
    };
  },
  methods: {
    showMap() {
      this.mapModal = true;
    },
    showImageModal(index) {
      this.currentImage = index;
      this.imageModal = true;
    },
    countPoints(min, max) {
      let randomBetween = Math.floor(Math.random() * (max - min + 1) + min);
      let round5 = Math.round(randomBetween / 5) * 5;
      return round5;
    },
    uploadImage(file) {
      this.uploaded = false;
      let storageRef = firebase
        .storage()
        .ref(
          `images/${this.pub.id.toString()}/${
            file.name
          }-${new Date().getTime()} `
        );
      let task = storageRef.put(file);

      task.on(
        "state_changed",
        snapshot => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percentage = percentage;
        },
        err => {
          console.log(err);
        },
        complete => {
          this.uploaded = true;
          this.imgReload = true;
          this.percentage = 0;
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            this.$store.commit("state/UPDATE_IMAGES", 1);
            const pubId = this.pub.id;
            const batch = db.batch();
            const increment = firebase.firestore.FieldValue.increment(1);
            const _points = this.countPoints(5, 10);
            this.$store.commit("state/UPDATE_POINTS", _points);
            const points = firebase.firestore.FieldValue.increment(_points);
            const pubRef = db.collection("pubs").doc(this.pub.id.toString());
            const userRef = db
              .collection("users")
              .doc(this.user.uid.toString());
            batch.update(pubRef, {
              images: firebase.firestore.FieldValue.arrayUnion(url)
            });

            batch.update(userRef, { img_total: increment });
            batch.update(userRef, { points_total: points });
            batch
              .commit()
              .then(() => {
                this.$parent.callPubs();
              })
              .then(() => {
                setTimeout(() => {
                  this.pubs.forEach((p, i) => {
                    if (p.id === pubId) {
                      this.getPub(this.pubs[i]);
                    }
                  });
                  this.imgReload = false;
                }, 1400);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          });
        }
      );
    },
    getPub(pub) {
      let parsedPub = JSON.parse(JSON.stringify(pub));
      this.$store.commit("state/UPDATE_PUB", parsedPub);
    },

    removePub() {
      this.$store.commit("state/REMOVE_PUB");
    },
    updateChallenge() {
      this.$store.commit(
        "state/UPDATE_CHALLENGE",
        this.pub[this.user.uid].challenge
      );
      const batch = db.batch();
      const dbRef = db.collection("pubs").doc(this.pub.id.toString());
      const userRef = db.collection("users").doc(this.user.uid.toString());
      const val = this.pub[this.user.uid].challenge ? 1 : -1;
      const points = this.pub[this.user.uid].challenge
        ? this.pub.challenge_points
        : -this.pub.challenge_points;
      this.$store.commit("state/UPDATE_POINTS", points);
      const increment = firebase.firestore.FieldValue.increment(points);
      const count = firebase.firestore.FieldValue.increment(val);
      batch.update(dbRef, {
        [`${this.user.uid}.challenge`]: this.pub[this.user.uid].challenge
      });
      batch.update(userRef, { challenges_total: count });
      batch.update(userRef, { points_total: increment });
      batch
        .commit()
        .then(() => {
          console.log("batch successful");
        })
        .catch(err => {
          console.log(err);
        });
    },
    beerUpdate(val, min, max) {
      this.$store.commit("state/UPDATE_BEER", val);
      const increment = firebase.firestore.FieldValue.increment(val);
      const _points = this.countPoints(min, max);
      const points = firebase.firestore.FieldValue.increment(_points);
      this.$store.commit("state/UPDATE_POINTS", _points);
      const batch = db.batch();
      const dbRef = db.collection("pubs").doc(this.pub.id.toString());
      const userRef = db.collection("users").doc(this.user.uid.toString());

      batch.update(dbRef, { [`${this.user.uid}.beer`]: increment });
      batch.update(dbRef, { beer_total: increment });
      batch.update(userRef, { beer_total: increment });
      batch.update(userRef, { points_total: points });
      batch
        .commit()
        .then(() => {
          console.log("batch successful");
        })
        .catch(err => {
          console.log(err);
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

<style lang="scss" scoped>
.rotate-90 {
  transform: rotate(-90deg);
}

.progress-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

progress {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  width: 100%;
}

.opac {
  opacity: 0.1;
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15) inset;
}

progress[value]::-webkit-progress-value {
  background-color: #71e769;
}

.challenge-enter,
.challenge-leave-to {
  transform: rotate(90deg);
  top: 30px !important;
  margin-right: 0;
  opacity: 0;
}

.challenge-enter-active,
.challenge-leave-active {
  transition: all 0.35s;
}
</style>
