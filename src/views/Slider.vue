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
            <div class="overflow-scroll pb-6" style="height: calc(100vh - 200px) !important">
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
      class="absolute opacity-50 bg-black top-0"
      style="height:102vh; width:100vw; z-index:1000"
    >sa</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";

export default {
  name: "Slider",
  data() {
    return {
      activeIndex: "",
      quiz: {
        question: "Jak má Vojta uloženou Máju v telefonu?",
        answers: [
          {
            answer: "Marie",
            correct: false
          },
          {
            answer: "Kata ponorka ",
            correct: true
          },
          {
            answer: "Carodejnice",
            correct: false
          },
          {
            answer: "Ano lasko",
            correct: false
          }
        ]
      },

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
    submitAnswer() {
      if (this.quiz.answers[this.activeIndex].correct) {
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user
    }),
    swiper() {
      return this.$refs.swiper.swiper;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  background-position: center;
  background-size: cover;
  background-color: white;
  width: 92vw;
  height: 90vh;
  color: black;
}

.text-gray-light {
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
