<template>
  <div class="absolute bg-black z-50" style="width: 100vw; height: 100Vh">
    <div class="w-16 h-16 pt-1 ml-3 pl-3 relative z-50" style="margin-top:18px" @click="closeModal">
      <div class="rounded-full bg-black">
        <img src="../../public/img/icons/arow_back.svg" class="w-8 h-8" />
      </div>
    </div>
    <div class="mx-3 absolute flex items-center" style="height: calc(100% - 120px);">
      <div class="w-full">
        <img :src="img" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Modal",
  props: ["img", "images"],
  methods: {
    closeModal() {
      this.$parent.imageModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
