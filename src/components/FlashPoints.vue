<template>
  <transition class="flash absolute" name="flash">
    <div v-show="flashPoints" class="absolute right-0 mr-1">
      <p class="text-xs text-gray-600 mr-5">{{points}}</p>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
import state from "../modules/state";
export default {
  name: "FlashPoints",
  data() {
    return {
      flashPoints: false
    };
  },
  methods: {},
  watch: {
    points() {
      this.flashPoints = true;
      let pointsTimeout = setTimeout(() => {
        this.flashPoints = false;
      }, 800);
    }
  },
  computed: {
    ...mapState({
      points: state => state.state.points
    })
  }
};
</script>

<style lang="scss" >
.flash {
  top: 50px;
}

.flash-enter {
  top: 0px !important;
  opacity: 0;
}

.flash-enter-active {
  transition: all 0.4s;
  top: 18px;
}

.flash-leave-to {
  top: 24px !important;
}

.flash-leave-active {
  transition: all 0.4s;
  top: 18px;
  opacity: 0;
}
</style>