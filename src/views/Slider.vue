<template>
  <div class="overlow-hidden" style="height: calc(100vh - 64px);">
    <div class="slider">
      <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 shadow-md">
        <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
        <p class="text-2xl font-bold text-white pt-6 px-6">Fun Center</p>
      </div>
    </div>
    <div style="margin-top: -36px">
      <div class="swiper-inner">
        <swiper :options="swiperOption">
          <swiper-slide class="rounded-t-large shadow-md" style="min-height: calc(100vh - 100px)">
            <div class="relative">
              <p class="p-3 text-gray-800 font-bold text-center text-2xl">Quiz</p>
            </div>
            <div
              v-if="!loading && quiz"
              class="overflow-scroll pb-6"
              style="height: calc(100vh - 200px) !important"
            >
              <div class="px-3">
                <p
                  style="width:90%"
                  class="text-gray-600 text-lg font-semibold mb-4"
                >{{quiz.question}}</p>

                <div
                  v-for="(a, i) in quiz.answers"
                  :key="i"
                  :class="{active : activeIndex === i}"
                  class="rounded flex w-full py-2 border border-gray-400 items-center flex my-2"
                  @click="selectAnswer(a, i)"
                >
                  <p class="px-3 text-gray-500">{{ a.answer }}</p>
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
              <p>You finished all quizes, go and buy Mike a beer</p>
            </div>
          </swiper-slide>

          <swiper-slide class="rounded-t-large shadow-md">
            <p class="p-3 text-gray-800 font-bold text-center text-2xl">Whatever</p>
          </swiper-slide>
          <swiper-slide class="rounded-t-large shadow-md">
            <p class="p-3 text-gray-800 font-bold text-center text-2xl">Even more fun stuff</p>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
        <p class="text-2xl text-center font-semibold text-white">-30 points</p>
      </div>

      <div
        ref="modalRight"
        class="bg-green absolute pb-6 pt-10 flex flex-col justify-center w-4/5 rounded shadow-lg modal-box"
      >
        <img src="../../public/img/icons/thumb.svg" />
        <p class="text-center mt-6 text-white text-lg">Fuck Yeah!</p>
        <p class="text-2xl text-center font-semibold text-white">+10 points</p>
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
      quizesFinished: false,
      answeredQuizes: [],
      quizes: [],
      quiz: null,
      activeIndex: "",
      swiperOption: {
        effect: "coverflow",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 2,
          slideShadows: false
        }
      }
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
    submitAnswer() {
      const modal = this.$refs.modal;
      const modalRight = this.$refs.modalRight;
      const modalWrong = this.$refs.modalWrong;

      this.answeredQuizes.indexOf(this.quiz) === -1
        ? this.answeredQuizes.push(this.quiz)
        : console.log("This item already exists");

      if (this.quiz.answers[this.activeIndex].correct) {
        modal.classList.remove("modal");
        modalRight.classList.remove("modal-box");
        setTimeout(() => {
          modal.classList.add("modal");
          modalRight.classList.add("modal-box");
          this.newQuiz();
        }, 1600);
      } else {
        modal.classList.remove("modal");
        modalWrong.classList.remove("modal-box");
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
  transition: all 0.6s;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  background-color: white;
  width: 92vw;
  height: 90vh;
  color: black;
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
