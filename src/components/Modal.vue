<template>
  <div class="absolute bg-black z-50" style="width: 100vw; height: 100vh">
    <div class="ml-3 mt-4 pl-1 relative w-12 z-50"  @click="closeModal">
      <img src="../../public/img/icons/close.svg" class="h-10" />
    </div>
    <div class="absolute top-0" style="height: 100%; width:100%">
      <swiper :options="swiperModal">
        <swiper-slide
          class="h-full w-full flex items-center justify-center"
          v-for="(image, index) in images"
          :key="index"
        >
          <img style="max-height:100%" :src="image" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Modal",
  props: ["images", "index"],
  data() {
    return {
      swiperModal: {
        initialSlide: this.index,
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: true,
        loop: true
      }
    };
  },
  methods: {
    closeModal() {
      this.$parent.imageModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  width: 100%;
}
</style>
