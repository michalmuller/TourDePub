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
          <div class="overflow-scroll pb-4" style="height: calc(100vh - 190px) !important">
            <div class="px-3 mt-5">
              <p class="text-gray-600 mb-2">Your stats</p>
              <div class="rounded flex justify-around w-full bg-medium-blue px-3 py-2">
                <div class="flex items-center mr-5">
                  <span class="text-gray-700 font-bold text-xl mr-2">{{user.challenges_total}}</span>
                  <img class="h-5" src="../../public/img/icons/challenge.svg" />
                </div>
                <div class="flex items-center mr-6">
                  <span class="text-gray-700 font-bold text-xl mr-2">{{user.quizes_total}}</span>
                  <img class="h-5" src="../../public/img/icons/quiz.svg" />
                </div>
                <div class="flex items-center mr-6">
                  <span class="text-gray-700 font-bold text-xl mr-2">{{user.img_total}}</span>
                  <img class="h-5" src="../../public/img/icons/img.svg" />
                </div>
                <div class="flex items-center">
                  <span class="text-gray-700 font-bold text-xl mr-2">{{user.beer_total}}</span>
                  <img class="w-3" src="../../public/img/icons/beer_color_bg_blue.svg" />
                </div>
              </div>
            </div>

            <div class="px-3 mt-6" v-if="user.role == 'admin'">
              <p class="text-gray-600 mb-2">Admin</p>
              <checkbox v-model="showDeleteUser">
                <p class="ml-3 text-gray-600">Delete user from DB</p>
              </checkbox>
              <div class="mt-2 mb-6" v-show="showDeleteUser">
                <div
                  v-for="(u, i) in users"
                  :key="i"
                  class="rounded flex w-full bg-medium-blue items-center px-3 py-2 mb-2"
                  @click="deleteUser(u)"
                >
                  <img class="h-7 rounded-full" :src="u.photoUrl" />
                  <p class="ml-3 font-semibold text-gray-800">{{u.displayName}}</p>
                </div>
              </div>

              <checkbox class="mt-2" v-model="showSerializeUser">
                <p class="ml-3 text-gray-600">Serialize user scores</p>
              </checkbox>
              <div class="mt-2 mb-6" v-show="showSerializeUser">
                <div
                  v-for="(u, i) in users"
                  :key="i"
                  class="rounded flex w-full bg-medium-blue items-center px-3 py-2 mb-2"
                  @click="serializeUser(u)"
                >
                  <img class="h-7 rounded-full" :src="u.photoUrl" />
                  <p class="ml-3 font-semibold text-gray-800">{{u.displayName}}</p>
                </div>
              </div>

              <checkbox class="mt-2" v-model="showCreateQuiz">
                <p class="ml-3 text-gray-600">Create new quiz</p>
              </checkbox>
              <div class="mt-2" v-show="showCreateQuiz">
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
              <checkbox class="mt-2" v-model="showCreatePub">
                <p class="ml-3 text-gray-600">Create new pub</p>
              </checkbox>
              <div class="mt-2" v-show="showCreatePub">
                <div class="flex flex-wrap">
                  <input
                    class="w-1/2 border rounded py-2 px-3 mb-3"
                    type="text"
                    placeholder="pub name"
                    v-model="pub.name"
                  />
                  <input
                    class="w-1/2 border rounded py-2 px-3 mb-3"
                    type="text"
                    placeholder="map text"
                    v-model="pub.text"
                  />
                  <input
                    class="w-2/3 border rounded py-2 px-3 mb-3"
                    type="text"
                    placeholder="challenge"
                    v-model="pub.challenge"
                  />
                  <input
                    class="w-1/3 border rounded py-2 px-3 mb-3"
                    type="number"
                    placeholder="points"
                    v-model.number="pub.challenge_points"
                  />
                  <input
                    class="w-1/2 border rounded py-2 px-3 mb-3"
                    placeholder="latitude"
                    type="number"
                    v-model.number="pub.lat"
                  />
                  <input
                    class="w-1/2 border rounded py-2 px-3 mb-3"
                    placeholder="longitude"
                    type="number"
                    v-model.number="pub.lng"
                  />
                  <button
                    @click="createPub"
                    type="submit"
                    class="bg-blue w-full text-white font-bold py-2 mt-6 px-4 rounded focus:outline-none focus:shadow-outline"
                  >submit</button>
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
      showDeleteUser: false,
      showCreateQuiz: false,
      showCreatePub: false,
      showSerializeUser: false,
      question: "",
      correctAnswer: "",
      falseAnswer1: "",
      falseAnswer3: "",
      falseAnswer2: "",
      pub: {
        name: "",
        text: "",
        challenge: "",
        challenge_points: 55,
        lat: 57.05,
        lng: 9.92
      }
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
          (this.question = ""),
            (this.correctAnswer = ""),
            (this.falseAnswer1 = ""),
            (this.falseAnswer2 = ""),
            (this.falseAnswer3 = "");
          console.log("quiz submitted");
        })
        .catch(err => console.log("Error: ", err));
    },
    createPub() {
      const id = this.pubs.length + 1;
      const users = this.users.reduce((map, obj) => {
        map[obj.uid] = { beer: 0, challenge: false };
        return map;
      }, {});

      const pub = {
        id: id,
        name: this.pub.name,
        text: this.pub.text,
        challenge: this.pub.challenge,
        challenge_points: this.pub.challenge_points,
        beer_total: 0,
        img:
          "https://firebasestorage.googleapis.com/v0/b/jbctourdepub.appspot.com/o/pub%2Fpub.png?alt=media&token=d528a8b3-ebba-4593-bca6-6e1b08b50905",
        position: {
          lat: this.pub.lat,
          lng: this.pub.lng
        },
        ...users
      };
      db.collection("pubs")
        .doc(id.toString())
        .set(pub)
        .then(() => {
          (this.pub.name = ""),
            (this.pub.text = ""),
            (this.pub.challenge = ""),
            (this.pub.challenge_points = ""),
            (this.pub.lat = ""),
            (this.pub.lng = "");
          console.log("pub written to DB");
        })
        .catch(err => console.log(err));
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
    deleteUser(user) {
      this.pubs.map(pub => {
        let dbRef = db.collection("pubs").doc(pub.id.toString());
        if (pub[user.uid]) {
          let points = pub[user.uid].beer;
          let decrement = firebase.firestore.FieldValue.increment(-points);
          let removeCurrentUserId = dbRef
            .update({
              [user.uid]: firebase.firestore.FieldValue.delete(),
              beer_total: decrement
            })
            .then(() => {
              console.log("user deleted from pubs");
            });
        }
      });
      db.collection("users")
        .doc(user.uid.toString())
        .delete()
        .then(() => {
          this.$router.replace("home");
          console.log("user deleted");
        })
        .catch(err => console.log(err));
    },

    serializeUser(user) {
      this.pubs.map(pub => {
        let dbRef = db.collection("pubs").doc(pub.id.toString());
        let points = pub[user.uid].beer;
        let decrement = firebase.firestore.FieldValue.increment(-points);
        let removeCurrentUserId = dbRef
          .update({
            [user.uid]: { beer: 0, challenge: false },
            beer_total: decrement
          })
          .then(() => {
            console.log("user deleted from pubs");
          });
      });
      db.collection("users")
        .doc(user.uid.toString())
        .update({
          beer_total: 0,
          challenges_total: 0,
          img_total: 0,
          points_total: 0,
          quizes_total: 0
        })
        .then(() => {
          this.$router.replace("home");
          console.log("user serialized");
        })
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
.username {
  max-width: 32vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>