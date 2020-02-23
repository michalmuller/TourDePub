<template>
  <div class="profile">
    <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
    </div>

    <div class="w-full top-0 fixed z-20">
      <div class="px-3 pb-2 mt-6 w-full z-30 flex justify-between">
        <div class="w-16">
          <h1 class="pl-3 text-2xl font-bold text-white">Leaderboard</h1>
        </div>
      </div>
      <div
        class="bg-white mx-3 relative rounded-t-large shadow-md"
        style="min-height: calc(100vh - 100px)"
      >
        <div v-if="!loading" class="relative">
          <div class="pb-3 pt-4 flex justify-center items-center text-center w-full" v-if="user">
            <span class="text-2xl font-bold text-gray-800">JBC Team</span>
          </div>
          <div class="overflow-scroll pb-4" style="height: calc(100vh - 190px) !important">
            <div class="px-3 mt-3">
              <p class="text-gray-600 mb-2">Leaderboard</p>
              <div
                v-for="(u, i) in users"
                :key="i"
                class="rounded flex w-full flex-col mb-1"
                :class="u.displayName == user.displayName ? 'bg-medium-blue': 'bg-medium-blue'"
              >
                <div @click="showUser(u,i)" class="flex justify-between items-center pt-2 pb-2">
                  <div class="flex items-center">
                    <span class="text-gray-600 font-bold text-xl mx-3 w-3">{{i+1}}</span>
                    <img class="rounded-full object-cover w-7 h-7 mr-2" :src="u.photoUrl" />
                    <span class="text-gray-800 font-bold text-lg username">{{u.displayName}}</span>
                  </div>
                  <div class="flex mr-3">
                    <span class="mr-3 text-gray-600 text-sm">{{u.points_total}} p.</span>
                    <img
                      :class="{'rotate': showUserIndex == i}"
                      src="../../public/img/icons/arrow_leaderboard.svg"
                    />
                  </div>
                </div>
                <div
                  v-if="showUserIndex == i"
                  class="flex justify-end mx-3 py-2 border-t border-white"
                >
                  <div class="flex items-center mr-5">
                    <span class="text-gray-700 font-bold text-xl mr-2">{{u.challenges_total}}</span>
                    <img class="h-5" src="../../public/img/icons/challenge.svg" />
                  </div>
                  <div class="flex items-center mr-6">
                    <span class="text-gray-700 font-bold text-xl mr-2">{{u.quizes_total}}</span>
                    <img class="h-5" src="../../public/img/icons/quiz.svg" />
                  </div>
                  <div class="flex items-center mr-6">
                    <span class="text-gray-700 font-bold text-xl mr-2">{{u.img_total}}</span>
                    <img class="h-5" src="../../public/img/icons/img.svg" />
                  </div>
                  <div class="flex items-center">
                    <span class="text-gray-700 font-bold text-xl mr-2">{{u.beer_total}}</span>
                    <img class="w-3" src="../../public/img/icons/beer_color_bg_blue.svg" />
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="px-3 mt-6">
              <p class="text-gray-600 mb-2">Another section</p>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
import Checkbox from "../components/Checkbox.vue";
export default {
  name: "Profile",
  mixins: [clickaway],
  components: { Checkbox },
  data() {
    return {
      showUserIndex: null
    };
  },
  methods: {
    away() {
      this.showAvatars = false;
    },
    showUser(u, i) {
      if (this.showUserIndex == i) {
        this.showUserIndex = null;
      } else {
        this.showUserIndex = i;
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user,
      users: state => state.state.users,
      pubs: state => state.state.pubs,
      loading: state => state.state.loading
    })
  },
  created() {
    let users = [];
    this.$store.commit("state/LOADING", true);
    const userRef = db.collection("users");
    userRef
      .orderBy("points_total", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          users.push(doc.data());
        });
        console.log("DB called for users");
      })
      .then(() => {
        this.$store.commit("state/LOADING", false);
        this.$store.commit("state/UPDATE_USERS", users);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
}
.username {
  max-width: 32vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
