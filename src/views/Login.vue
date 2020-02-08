<template>
  <div class="flex justify-center h-full items-center" style="height:100vh !important">
    <div class="w-full px-6" style="max-width:340px">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="login">
        <h1 class="text-2xl font-bold text-center mb-6">{{ signUpToggle ? 'Sign Up' : 'Login' }}</h1>
        <div class="mb-4" v-show="signUpToggle">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nickname</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="displayName"
            placeholder="chcanka"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="email"
            placeholder="Standa@vypil.to"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
            placeholder="**********"
          />
        </div>
        <div class="flex">
          <button
            v-if="signUpToggle"
            class="w-full bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click="signUp"
          >Sign Up</button>
          <button
            v-else
            class="w-full bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click="login"
          >Login</button>
        </div>
        <div class="flex justify-center mt-4">
          <p class="text-sm">
            {{ signUpToggle ? 'Already a member?' : 'Are you new?' }}
            <span
              @click="toggle"
              class="font-bold text-blue"
            >{{ signUpToggle ? 'login' : 'sign up' }}</span>
          </p>
        </div>
      </form>
      <p
        class="text-center text-gray-500 text-xs"
      >&copy; {{ year }} Michal Muller. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "login",
  data() {
    return {
      signUpToggle: false,
      email: "",
      password: "",
      displayName: ""
    };
  },
  methods: {
    toggle() {
      this.signUpToggle = !this.signUpToggle;
    },

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          var user = {
            displayName: res.user.displayName,
            uid: res.user.uid,
            email: res.user.email,
            photoUrl: res.user.photoURL
          };
          this.$store.commit("state/AUTH_USER", user);
          this.$router.replace("home");
          this.$parent.callPubs();
        })
        .catch(err => {
          console.log(err);
        });
    },

    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          var currentUser = firebase.auth().currentUser;

          currentUser
            .updateProfile({
              displayName: this.displayName
            })
            .then(() => {
              db.collection("pubs")
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    db.collection("pubs")
                      .doc(doc.id)
                      .set(
                        {
                          [currentUser.uid]: 0
                        },
                        { merge: true }
                      );
                  });
                })
                .catch(err => console.log(err));
              var user = {
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                email: currentUser.email,
                photoUrl: currentUser.photoURL
              };
              this.$store.commit("state/AUTH_USER", user);
            })
            .then(() => {
              db.collection("users")
                .doc(currentUser.uid)
                .set({
                  beer_total: 0,
                  img_total: 0,
                  quizes_total: 0,
                  points_total: 0,
                  role: "user",
                  displayName: currentUser.displayName,
                  photoUrl:
                    "https://firebasestorage.googleapis.com/v0/b/jbctourdepub.appspot.com/o/avatars%2Favatar_empty.svg?alt=media&token=f08288be-a117-480a-804c-323fa83c1417"
                });
            })
            .then(() => {
              this.$store.commit("state/LOADING", true);
              this.$router.replace("home");
              setTimeout(() => {
                this.$parent.callPubs();
              }, 1800);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    year() {
      let dt = new Date();
      return dt.getFullYear();
    }
  }
};
</script>

<style>
p a {
  text-decoration: none;
  color: black;
}
</style>
