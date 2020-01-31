<template>
  <div class="profile">
    <div
      id="header"
      style="height:6.5rem"
      class="w-full bg-gradient-primary z-10 top-0 fixed shadow-md"
    >
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
    </div>

    <div class="w-full top-0 fixed z-20">
      <div class="px-6 py-3 mt-1 w-full z-30 flex justify-between">
        <div class="w-16">
          <h1 class="pl-3 text-2xl font-bold text-white">Profile</h1>
        </div>
        <div class="w-12">
          <img src="../../public/img/icons/gear.svg" class="mt-1 ml-3 w-7 h-7" />
        </div>
      </div>
      <div
        v-if="!loading"
        class="bg-white mx-3 mt-1 relative rounded-t-large"
        style="min-height: calc(100vh - 100px)"
      >
        <div>
          <div class="mb-3 py-4 flex justify-center items-center text-center w-full" v-if="user">
            <img :src="user.photoUrl" class="h-10 w-10 rounded-full mr-3 objet-cover" />
            <span class="text-2xl font-bold text-gray-800 font-bold">{{ user.displayName }}</span>
          </div>
          <div class="px-3 mt-5">
            <p class="text-gray-600 mb-2">Your contribution</p>
            <div class="rounded flex w-full h-12 bg-light-blue">
              <div class="flex items-center ml-3">
                <img class="w-3" src="../../public/img/icons/beer_color.svg" />
                <span class="text-lg font-bold text-gray-800 ml-2">{{user.beer_total}} drinks</span>
              </div>

              <div class="flex items-center ml-6">
                <img class="w-6" src="../../public/img/icons/img_dark.svg" />
                <span class="text-lg font-bold text-gray-800 ml-2">{{user.img_total}} photos</span>
              </div>
            </div>
          </div>

          <div class="px-3 mt-5">
            <p class="text-gray-600 mb-2">Leaderboard</p>
          </div>
          <!-- <button
            class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="signOut"
          >Logout</button>-->
          <!-- <div class="mt-6 px-3">
            <p class="mb-2">Delete user from pubs</p>
            <input
              class="mb-3 w-full border rounded"
              type="text"
              v-model="firebaseUid"
              placeholder="RiiEpdGjcYq3gpd0F2"
            />
            <button
              class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              @click="deleteUser"
            >Delete user</button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "Profile",
  data() {
    return {
      firebaseUid: ""
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.logout();
        })
        .then(() => {
          this.$router.replace("home");
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteUser() {
      this.pubs.map(pub => {
        let dbRef = db.collection("pubs").doc(pub.id.toString());
        let removeCurrentUserId = dbRef
          .update({
            [this.firebaseUid]: firebase.firestore.FieldValue.delete()
          })
          .then(() => console.log("user deleted"));
      });
    },
    logout() {
      this.$store.commit("state/LOGOUT_USER");
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

<style lang="scss"></style>
