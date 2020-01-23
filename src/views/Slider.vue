<template>
  <div class="col-xs-12">
    <div style="margin-top:40px">
      <div class="swiper-inner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="i in 5" :key="i">{{i}}</swiper-slide>
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
          rotate: -10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  methods: {
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
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
  background-color: rgba(255, 255, 255, 0.9);
  width: 90vw;
  height: 100vh;
  color: black
}
.swiper-slide-shadow-left {
  opacity: 0.1;
}
</style>