<template>
  <div class="m-6">
    <h1 class="mb-3" v-if="user">
      Nickname:
      <span class="font-bold">{{ user.displayName }}</span>
    </h1>
    <h1 class="mb-3" v-if="user">
      Email:
      <span class="font-bold">{{ user.email }}</span>
    </h1>
    <h1 class="mb-3" v-if="user">
      Drinks:
      <span class="font-bold">{{ user.beer_total }}</span>
    </h1>
    <button
      class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="signOut"
    >Logout</button>
    <div class="mt-6">
      <p class="mb-2">Delete user from pubs</p>
      <input class="mb-3 w-full" type="text" v-model="firebaseUid" placeholder="RiiEpdGjcYq3gpd0F2" />
      <button
        class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        @click="deleteUser"
      >Delete user</button>
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
