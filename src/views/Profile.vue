<template>
  <div class="profile">
    <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
    </div>

    <div class="w-full top-0 fixed z-20">
      <div class="px-3 pb-2 mt-6 w-full z-30 flex justify-between">
        <div class="w-16">
          <h1 class="pl-3 text-2xl font-bold text-white">Profile</h1>
        </div>
        <div class="w-12 relative">
          <img
            @click="options = !options"
            src="../../public/img/icons/gear.svg"
            class="mt-1 ml-3 w-7 h-7"
          />
          <div
            v-if="options"
            class="bg-white absolute z-30 rounded shadow-md px-5 py-3"
            style="right:0.75rem; top:2.3rem"
          >
            <p class="text-gray-600 text-xs mb-2">options</p>
            <button
              class="bg-blue text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="signOut"
            >Logout</button>
          </div>
        </div>
      </div>
      <div
        class="bg-white mx-3 relative rounded-t-large shadow-md"
        style="min-height: calc(100vh - 100px)"
      >
        <div v-if="!loading" class="relative">
          <div class="pb-3 pt-4 flex justify-center items-center text-center w-full" v-if="user">
            <img
              :src="user.photoUrl"
              class="h-8 w-8 rounded-full mr-3 object-cover"
              @click="showAvatars = !showAvatars"
            />
            <span class="text-2xl font-bold text-gray-800">{{ user.displayName }}</span>
          </div>
          <div
            v-on-clickaway="away"
            v-if="showAvatars"
            class="mx-3 bg-white py-3 rounded shadow-around absolute"
          >
            <div class="flex justify-between items-center px-3">
              <p class="text-lg font-medium text-gray-600">Choose an avatar</p>
              <div class="p-3" @click="showAvatars = !showAvatars">
                <img src="../../public/img/icons/cross.svg" />
              </div>
            </div>
            <div
              v-if="avatars"
              class="flex flex-wrap px-3 pt-2 overflow-scroll"
              style="max-height:280px"
            >
              <div
                class="border-2 border-white w-1/4"
                v-for="(avatar, index) in avatars"
                :key="index"
                @click="changeAvatar(avatar)"
              >
                <img class="object-cover w-full" :src="avatar" alt />
              </div>
            </div>
          </div>
          <div class="overflow-scroll pb-4" style="height: calc(100vh - 200px) !important">
            <div class="px-3 mt-5">
              <p class="text-gray-600 mb-2">Leaderboard</p>
              <div
                v-for="(u, i) in users"
                :key="i"
                class="rounded flex w-full flex-col mb-1"
                :class="u.displayName == user.displayName ? 'bg-medium-blue': 'bg-medium-blue'"
              >
                <div @click="showUser(u,i)" class="flex justify-between items-center pt-2 pb-2">
                  <div class="flex">
                    <span class="text-gray-600 font-bold text-xl mx-3 w-3">{{i+1}}</span>
                    <img class="rounded-full object-cover w-7 h-7 mr-2" :src="u.photoUrl" />
                    <span class="text-gray-800 font-bold text-xl">{{u.displayName}}</span>
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

            <div class="px-3 mt-6" v-if="user.role == 'admin'">
              <p class="text-gray-600 mb-2">Admin</p>
              <checkbox v-model="showAdminOptions">
                <p class="ml-3 text-gray-600">show admin options</p>
              </checkbox>
              <div class="mt-6" v-show="showAdminOptions">
                <div>
                  <p class="mb-2 text-gray-600">Delete user from pubs</p>
                  <div class="flex">
                    <input
                      class="w-full border rounded py-1 px-3 mr-3"
                      type="text"
                      v-model="firebaseUid"
                      placeholder="RiiEpdGjcYq3gpd0F2"
                    />
                    <button
                      class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      @click="deleteUser"
                    >delete</button>
                  </div>
                </div>
                <div class="mt-6">
                  <p class="mb-2 text-gray-600">Create new quiz</p>
                  <div class="flex flex-wrap">
                    <input
                      class="w-full border rounded py-2 px-3 mb-3"
                      type="text"
                      placeholder="question"
                      v-model="question"
                    />
                    <input
                      class="w-full text-white placeholder-indigo-200 rounded py-2 mb-2 px-3 bg-gradient-primary"
                      type="text"
                      placeholder="correct answer"
                      v-model="correctAnswer"
                    />
                    <input
                      class="w-full rounded py-2 mb-2 px-3 bg-medium-blue"
                      type="text"
                      placeholder="wrong answer"
                      v-model="falseAnswer1"
                    />
                    <input
                      class="w-full rounded py-2 mb-2 px-3 bg-medium-blue"
                      type="text"
                      placeholder="wrong answer"
                      v-model="falseAnswer2"
                    />
                    <input
                      class="w-full rounded py-2 mb-2 px-3 bg-medium-blue"
                      type="text"
                      placeholder="wrong answer"
                      v-model="falseAnswer3"
                    />
                    <button
                      @click="submitQuiz"
                      class="bg-blue w-full text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >submit</button>
                  </div>
                </div>
              </div>
            </div>
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
      showUserIndex: null,
      firebaseUid: "",
      options: false,
      avatars: null,
      showAvatars: false,
      showAdminOptions: true,
      question: "",
      correctAnswer: "",
      falseAnswer1: "",
      falseAnswer3: "",
      falseAnswer2: ""
    };
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    submitQuiz() {
      var arr = [
        { answer: this.correctAnswer, correct: true },
        { answer: this.falseAnswer1, correct: false },
        { answer: this.falseAnswer2, correct: false },
        { answer: this.falseAnswer3, correct: false }
      ];
      arr = this.shuffle(arr);
      const data = {
        question: this.question,
        answers: arr
      };
      db.collection("quizes")
        .add(data)
        .then(() => {
          (this.correctAnswer = ""),
            (this.falseAnswer1 = ""),
            (this.falseAnswer2 = ""),
            (this.falseAnswer3 = "");
          console.log("quiz submitted");
        })
        .catch(err => console.log("Error: ", err));
    },
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
    away() {
      this.showAvatars = false;
    },
    showUser(u, i) {
      if (this.showUserIndex == i) {
        this.showUserIndex = null;
      } else {
        this.showUserIndex = i;
      }
    },
    deleteUser() {
      this.pubs.map(pub => {
        let dbRef = db.collection("pubs").doc(pub.id.toString());
        let removeCurrentUserId = dbRef
          .update({
            [this.firebaseUid]: firebase.firestore.FieldValue.delete()
          })
          .then(() => console.log("user deleted from pubs"));
      });
      db.collection("users")
        .doc(this.firebaseUid.toString())
        .delete()
        .then(() => console.log("user deleted"))
        .catch(err => console.log(err));
    },
    changeAvatar(avatar) {
      let index = this.users.findIndex(
        u => u.displayName === this.user.displayName
      );
      this.$store.commit("state/CHANGE_AVATAR", { url: avatar, i: index });
      db.collection("users")
        .doc(this.user.uid.toString())
        .set(
          {
            photoUrl: avatar
          },
          { merge: true }
        )
        .then(() => {
          this.showAvatars = false;
          console.log("avatar changed");
        })
        .catch(err => console.log(err));
    },
    logout() {
      this.$store.commit("state/LOGOUT_USER");
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user,
      users: state => state.state.users,
      pubs: state => state.state.pubs,
      pub: state => state.state.pub,
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

    let avatarRef = db.collection("avatars").doc("images");
    avatarRef.get().then(doc => {
      this.avatars = doc.data().avatars;
    });
  }
};
</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
}
</style>
