<template>
  <div class="flex justify-center h-full items-center" style="height:100vh !important">
    <div class="w-full px-6" style="max-width:340px">
      <form class="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4" v-on:submit.prevent="login">
        <h1 class="text-2xl font-bold text-center mb-6">{{ signUpToggle ? 'Sign Up' : 'Login' }}</h1>
        <div class="mb-4" v-show="signUpToggle">
          <div class="flex justify-between">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="username">Nickname</label>
            <p class="text-xs text-gray-500">{{displayName.length}}/10</p>
          </div>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="displayName"
            maxlength="10"
            placeholder="stano"
          />
        </div>
        <div class="mb-5">
          <label class="block text-gray-700 text-sm font-bold mb-1" for="username">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            v-model="email"
            @click="clearErrMsg"
            placeholder="Standa@vypil.to"
          />
          <p
            class="text-xs text-red pt-1"
            v-if="loginErrMsg == 'auth/invalid-email'"
          >email address is badly formatted</p>
          <p
            class="text-xs text-red pt-1"
            v-if="loginErrMsg == 'auth/user-not-found'"
          >no user under this email address</p>
          <p class="text-xs text-red pt-1" v-if="userExists">the email address is already in use</p>
        </div>
        <div class="mb-5">
          <div class="flex justify-between">
            <label class="block text-gray-700 text-sm font-bold mb-1" for="password">Password</label>
            <p v-show="signUpToggle" class="text-xs text-gray-500">8 char. min</p>
          </div>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
            placeholder="**********"
            @click="clearErrMsg"
          />
          <p
            class="text-xs text-red pt-1"
            v-if="loginErrMsg == 'auth/wrong-password'"
          >the password is invalid</p>
        </div>
        <div class="mb-5" v-show="signUpToggle">
          <checkbox v-model="terms">
            <p class="text-sm ml-2 text-gray-800">
              I agree to
              <span
                @click="openTermsModal"
                class="text-blue font-semibold"
              >terms and stuff</span>
            </p>
          </checkbox>
          <p
            v-if="terms && !openedTerms"
            class="text-xs text-red pt-1"
          >You haven't read it. Go and read it!</p>
        </div>
        <div class="flex mt-3">
          <button
            :disabled="!terms || displayName.length < 1 || email.length < 3 || password.length < 8"
            :class="{'opacity-50': ( !terms || displayName.length < 1 || email.length < 3 || password.length < 8)}"
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
          <p class="text-sm text-gray-800">
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
    <div v-show="loginErr" class="absolute bg-red text-white bottom-0 w-full text-center">
      <p class="py-3">Login / Sign up failed</p>
    </div>
    <div
      v-if="openTerms"
      class="absolute w-full h-full px-6 flex items-center"
      style="max-width:340px"
    >
      <div
        class="bg-white shadow-around rounded w-full overflow-scroll px-4 pt-6 pb-4"
        style="max-height:520px"
      >
        <div class="flex text-lg mb-3 font-bold items-center justify-between">
          <h1 class="text-gray-800">Terms and Conditions</h1>
          <img @click="openTerms=false" src="../../public/img/icons/cross.svg" />
        </div>
        <p class="text-gray-700 text-sm mb-3">
          This is a pretty standard user agreement (
          <b>"Agreement"</b>). Basically, it is a contract between you(
          <b>"you"</b>,
          <b>"your"</b> or
          <b>"User"</b>) and Michal Muller
          (
          <b>"I"</b>,
          <b>"me"</b>,
          <b>"mine"</b> or
          <b>"Devil"</b>
          ). First of all, you must read, agree to, and accept all of the terms and conditions contained in this Agreement in order to use
          this absolutely amazing app, on which I spend way to much time already.
        </p>
        <p class="text-gray-700 text-sm mb-3">
          This Agreement includes following Privacy Policy: Your data is probably not safe. It could be, but I wouldn't bet my life on it. If there is a thing such as being
          '100% GDPR compliant', then this app is about 2%. By agreeing to the terms and conditions you are saying that you are okay with it.
        </p>
        <p class="text-gray-700 text-sm mb-3">
          If the application crashes or is not working at times, don't be an asshole about it, especially if your name is Standa. the camera might not work sometimes. It is a fucking
          miracle that it does work most of the time, so stop bitching about and appreciate it okay.
        </p>
        <p class="text-gray-700 text-sm">Another thing, DON'T CHEAT!</p>
        <p
          class="text-gray-700 text-sm mb-3"
        >If you'll cheat and get caught, you are out my friend! Be an honest player{{displayName? ', ' + displayName:''}}.</p>
        <p
          class="text-gray-700 text-sm mb-3"
        >If I am hungover and I ask for a freshly squeezed orange juice and some pancakes, it would be really cool, if you could do that.</p>
        <p
          class="text-gray-700 text-sm mb-3"
        >By agreeing to the terms and conditions you are also saying that your soul belongs to me now. Enjoy the app.</p>
        <button
          @click="agreeToTerms"
          class="w-full bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >I Agree</button>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "../components/Checkbox.vue";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "login",
  components: { Checkbox },
  data() {
    return {
      loginErrMsg: null,
      loginErr: false,
      userExists: false,
      terms: false,
      openTerms: false,
      openedTerms: false,
      signUpToggle: false,
      email: "",
      password: "",
      displayName: ""
    };
  },
  methods: {
    clearErrMsg() {
      this.loginErrMsg = null;
      this.loginErr = false;
      this.userExists = false;
    },
    toggle() {
      this.signUpToggle = !this.signUpToggle;
      this.loginErrMsg = null;
      this.loginErr = false;
      this.userExists = false;
    },
    openTermsModal() {
      this.openTerms = true;
      this.openedTerms = true;
    },
    agreeToTerms() {
      this.terms = true;
      this.openTerms = false;
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
          if (this.signUpToggle) {
            return;
          }
          this.loginErr = true;
          this.loginErrMsg = err.code;
          if (err.code == "auth/email-already-in-use") {
            this.userExists = true;
          }
          console.log("Error from login:", err);
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
                          [currentUser.uid]: { beer: 0, challenge: false }
                        },
                        { merge: true }
                      );
                  });
                })
                .catch(err => {
                  this.loginErr = true;
                  this.loginErrMsg = err.code;
                  if (err.code == "auth/email-already-in-use") {
                    console.log("user exists");
                    this.userExists = true;
                  }
                  console.log("Error sign up:", err);
                });
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
                  challenges_total: 0,
                  onboarding: true,
                  role: "user",
                  displayName: currentUser.displayName,
                  uid: currentUser.uid,
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
          this.loginErr = true;
          this.loginErrMsg = err.code;
          if (err.code == "auth/email-already-in-use") {
            console.log("user exists");
            this.userExists = true;
          }
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

input:checked + svg {
  display: block;
}
</style>
