<template>
  <div class="absolute bg-black z-50" style="width: 100vw; height: 100vh">
    <div class="ml-3 mt-5 pl-1 relative w-12 z-50" @click="closeModal">
      <img src="../../public/img/icons/close.svg" class="h-8" />
    </div>
    <div class="absolute top-0" style="height: 100%; width:100%">
      <swiper :options="swiperModal" ref="mySwiper">
        <swiper-slide
          class="h-full w-full flex items-center justify-center"
          v-for="(image, index) in images"
          :key="index"
        >
          <img style="max-height:100%" :src="image" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="download absolute w-12 z-50" @click="download()">
      <img src="../../public/img/icons/download.svg" class="h-12" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Modal",
  props: ["images", "index"],
  data() {
    return {
      swiperModal: {
        initialSlide: this.index,
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true
      }
    };
  },
  methods: {
    closeModal() {
      this.$parent.imageModal = false;
    },
    download() {
      const url = this.images[this.$refs.mySwiper.swiper.realIndex];
      axios({
        url: url,
        method: "GET",
        responseType: "blob"
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${new Date().getTime()}.jpg`);
        document.body.appendChild(link);
        link.click();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  width: 100%;
}

.download {
  bottom: 12px;
  right: 12px;
}
</style>
