<template>
  <div class="slider">
    <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 fixed shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
    </div>

    <div class="w-full top-0 fixed z-20">
      <div class="px-3 pb-2 mt-6 w-full z-30 flex justify-between">
        <div class="w-16">
          <h1 class="pl-3 text-2xl font-bold text-white">Quiz</h1>
        </div>
      </div>
      <div
        class="bg-white mx-3 relative rounded-t-large shadow-md"
        style="min-height: calc(100vh - 100px)"
      >
        <div
          v-if="!loading && quiz"
          class="overflow-scroll pb-6"
          style="height: calc(100vh - 186px) !important"
        >
          <div class="px-3">
            <p
              class="pt-6 px-3 text-gray-800 text-center text-lg font-semibold mb-4"
            >{{quiz.question}}</p>
            <div
              v-for="(a, i) in quiz.answers"
              :key="i"
              :class="{active : activeIndex === i}"
              class="rounded flex w-full py-2 bg-medium-blue items-center flex my-2"
              @click="selectAnswer(a, i)"
            >
              <p class="px-3 text-gray-700">{{ a.answer }}</p>
            </div>
            <button
              :disabled="activeIndex === ''"
              :class="{'opacity-50': activeIndex === ''}"
              @click="submitAnswer()"
              class="mt-4 text-lg font-semibold text-white bg-blue rounded py-2 w-full"
            >Submit</button>
          </div>
        </div>
        <div class="px-3 pt-5 text-gray-800" v-if="quizesFinished">
          <p>You finished all quizes, go and get a beer</p>
        </div>
      </div>
    </div>
    <div
      ref="modal"
      class="absolute bg-black-transparent modal top-0 flex justify-center items-center"
      style="height:102vh; width:100vw; z-index:1000"
    >
      <div
        ref="modalWrong"
        class="bg-red absolute pb-6 pt-10 flex flex-col justify-center w-4/5 rounded shadow-lg modal-box"
      >
        <img class="flip" src="../../public/img/icons/thumb.svg" />
        <p class="text-center mt-6 text-white text-lg">Sooo wrong!</p>
        <p class="text-2xl text-center font-semibold text-white">{{points}} points</p>
      </div>

      <div
        ref="modalRight"
        class="bg-green absolute pb-6 pt-10 flex flex-col justify-center w-4/5 rounded shadow-lg modal-box"
      >
        <img src="../../public/img/icons/thumb.svg" />
        <p class="text-center mt-6 text-white text-lg">Fuck Yeah!</p>
        <p class="text-2xl text-center font-semibold text-white">{{points}} points</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "Slider",
  data() {
    return {
      points: 0,
      quizesFinished: false,
      answeredQuizes: [],
      quizes: [],
      quiz: null,
      activeIndex: ""
    };
  },
  methods: {
    selectAnswer(a, i) {
      this.activeIndex = i;
    },
    newQuiz() {
      //filter out answered questions
      this.quizes = this.quizes.filter(
        val => !this.answeredQuizes.includes(val)
      );
      this.activeIndex = "";
      if (this.quizes.length === 0) {
        this.quiz = null;
        this.quizesFinished = true;
      } else {
        this.quiz = this.quizes[Math.floor(Math.random() * this.quizes.length)];
      }
    },
    countPoints(min, max) {
      let randomBetween = Math.floor(Math.random() * (max - min + 1) + min);
      let round5 = Math.round(randomBetween / 5) * 5;
      return round5;
    },
    submitAnswer() {
      const modal = this.$refs.modal;
      const modalRight = this.$refs.modalRight;
      const modalWrong = this.$refs.modalWrong;
      const batch = db.batch();
      const userRef = db.collection("users").doc(this.user.uid.toString());

      this.answeredQuizes.push(this.quiz);

      if (this.quiz.answers[this.activeIndex].correct) {
        const increment = firebase.firestore.FieldValue.increment(1);
        const p = this.countPoints(10, 25);
        this.points = p;
        const points = firebase.firestore.FieldValue.increment(p);
        modal.classList.remove("modal");
        modalRight.classList.remove("modal-box");
        batch.update(userRef, { quizes_total: increment });
        batch.update(userRef, { points_total: points });
        batch
          .commit()
          .then(() => {
            console.log("batch successful");
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          modal.classList.add("modal");
          modalRight.classList.add("modal-box");
          this.newQuiz();
        }, 1600);
      } else {
        const decrement = firebase.firestore.FieldValue.increment(-1);
        const p = this.countPoints(-20, -40);
        this.points = p;
        const points = firebase.firestore.FieldValue.increment(p);
        modal.classList.remove("modal");
        modalWrong.classList.remove("modal-box");
        batch.update(userRef, { points_total: points });
        batch.update(userRef, { quizes_total: decrement });
        batch
          .commit()
          .then(() => {
            console.log("batch successful");
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          modal.classList.add("modal");
          modalWrong.classList.add("modal-box");
          this.newQuiz();
        }, 1600);
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user,
      loading: state => state.state.loading
    }),
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  created() {
    let quizes = [];
    this.$store.commit("state/LOADING", true);
    const quizesRef = db.collection("quizes");
    quizesRef
      .get()
      .then(qs => {
        qs.forEach(doc => {
          quizes.push(doc.data());
        });
      })
      .then(() => {
        console.log("db called for quizes");
        this.$store.commit("state/LOADING", false);
        this.quizes = quizes;
        this.quiz = quizes[Math.floor(Math.random() * quizes.length)];
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss" scoped>
.flip {
  transform: scale(1, -1);
}

.modal,
.modal-box {
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
}

.active {
  background-image: linear-gradient(135deg, #567bde, #7d56db);
  font-weight: 500;
  border-color: transparent;
  p {
    color: white !important;
  }
}
</style>
