<template>
  <div class="absolute bg-gradient-primary z-50" style="width: 100vw; height: 100vh">
    <div class="mt-5 relative w-full z-50 flex items-center justify-end" @click="closeOnboarding">
      <p class="px-6 font-semibold text-white">Skip</p>
    </div>
    <div
      class="absolute bg-white ml-3 bottom-0 rounded-t-large"
      style="height: calc(100% - 60px); width: calc(100% - 24px)"
    >
      <swiper :options="swiperOnboarding" ref="onboardingSwiper">
        <swiper-slide class="h-full w-full flex items-center justify-center">
          <div class="w-full h-full">
            <div class="px-12 mt-8 flex justify-center">
              <img
                style="max-width:200px; max-height:220px"
                src="../../public/img/icons/onboarding-beer.svg"
              />
            </div>
            <div class="mt-2 text-center">
              <p class="text-gray-800 font-bold text-2xl">Tour De Pub</p>
              <div class="flex justify-center">
                <p
                  class="text-gray-600 px-6 pt-2"
                  style="max-width:270px"
                >Great to have you on board</p>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="h-full w-full flex items-center justify-center">
          <div class="w-full h-full">
            <div class="px-12 mt-8 flex justify-center">
              <img
                style="max-width:190px; max-height:220px"
                src="../../public/img/icons/onboarding-pubs.svg"
              />
            </div>
            <div class="mt-2 text-center">
              <p class="text-gray-800 font-bold text-2xl">Find Pubs</p>
              <div class="flex justify-center">
                <p
                  class="text-gray-600 px-6 pt-2"
                  style="max-width:270px"
                >Discover pubs from the list view or plan your route for pub crawl using the map.</p>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="h-full w-full flex items-center justify-center">
          <div class="w-full h-full">
            <div class="px-12 mt-8 flex justify-center">
              <img
                style="max-width:190px; max-height:220px"
                src="../../public/img/icons/onboarding-collect.svg"
              />
            </div>
            <div class="mt-2 text-center">
              <p class="text-gray-800 font-bold text-2xl">Collect Points</p>
              <div class="flex justify-center">
                <p
                  class="text-gray-600 px-6 pt-2"
                  style="max-width:270px"
                >Collect points by drinking, taking pictures, completing challenges or answering trick questions.</p>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="h-full w-full flex items-center justify-center">
          <div class="w-full h-full">
            <div class="px-12 mt-8 flex justify-center">
              <img
                style="max-width:200px; max-height:220px"
                src="../../public/img/icons/onboarding-win.svg"
              />
            </div>
            <div class="mt-1 text-center">
              <p class="text-gray-800 font-bold text-2xl">Win the Game</p>
              <div class="flex justify-center">
                <p
                  class="text-gray-600 px-6 pt-2"
                  style="max-width:270px"
                >Leaderboard in your profile displays your overall score. Stay on top of the game and show your mates how winning is done.</p>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="h-full w-full flex items-center justify-center">
          <div class="w-full h-full">
            <div class="px-12 mt-12 flex justify-center">
              <img
                style="max-width:200px; max-height:220px"
                src="../../public/img/icons/onboarding-beer.svg"
              />
            </div>
            <div class="mt-2 text-center">
              <button
                @click="closeOnboarding"
                class="bg-blue mt-2 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
              >Let's start</button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="absolute z-10 w-full items-center bottom-0 flex justify-between">
        <div class="prev mb-3">
          <span class="px-6 font-semibold text-gray-400">prev</span>
        </div>
        <div class="flex justify-center">
          <div class="swiper-pagination mb-2 flex" slot="pagination"></div>
        </div>
        <div class="next mb-3">
          <span class="px-6 font-semibold text-blue">next</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "Onboarding",
  data() {
    return {
      swiperOnboarding: {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        }
      }
    };
  },
  methods: {
    closeOnboarding() {
      db.collection("users")
        .doc(this.user.uid.toString())
        .set(
          {
            onboarding: false
          },
          { merge: true }
        )
        .then(() => {
          this.$store.commit("state/ONBOARDING_DONE");
          console.log("onboarding completed");
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user
    })
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  width: 100%;
}
</style>

<style lang="scss">
.swiper-pagination {
  bottom: 12px;
  .swiper-pagination-bullet {
    margin-left: 3px;
    margin-right: 3px;
    opacity: 1;
    background: #cbd5e0;
    // width: 10px;
    // height: 10px;
  }
  .swiper-pagination-bullet-active {
    background: #567bde;
  }
}
</style>
