<template>
  <div class="overlow-hidden" style="height: calc(100vh - 64px);">
    <div class="slider">
      <div style="height:6.5rem" class="w-full bg-gradient-primary z-10 top-0 shadow-md">
        <img src="../../public/img/circle_overlay.png" class="absolute" style="width:42%" />
        <p class="text-2xl font-bold text-white pt-6 px-6">Quiz</p>
      </div>
    </div>
    <div style="margin-top: -36px">
      <div class="swiper-inner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="i in 5" :key="i" class="rounded-t-large shadow-md" style>
            <p class="p-3 text-2xl">slider{{ i }}</p>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "firebase";

export default {
  name: "Slider",
  data() {
    return {
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
  methods: {},
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

<style scoped>
.swiper-slide {
  background-position: center;
  background-size: cover;
  background-color: white;
  width: 92vw;
  height: 90vh;
  color: black;
}
</style>
