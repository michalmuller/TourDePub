<template>
  <div class="fixed z-20 bottom-0 w-full shadow-top">
    <div id="nav" class="bg-white flex justify-around items-center pb-1">
      <div style="flex: 1">
        <router-link to="/quiz" class="nav-icon pt-2 flex items-center flex-col">
          <div class="w-12 h-7 flex items-center justify-center">
            <img class="h-7" src="../../public/img/icons/question.svg" />
          </div>
          <p class="text-xs">quiz</p>
        </router-link>
      </div>
      <div style="flex: 1">
        <router-link
          to="/"
          @click.native="displayPubs"
          class="nav-icon pt-2 flex items-center flex-col"
        >
          <div class="w-12 h-7 flex items-center justify-center">
            <img class="h-8" src="../../public/img/icons/beer.svg" />
          </div>
          <p class="text-xs">tour</p>
        </router-link>
      </div>
      <div style="flex: 1">
        <router-link to="/leaderboard" class="nav-icon pt-2 flex items-center flex-col">
          <div class="w-12 h-7 flex items-center justify-center">
            <img class="h-8" src="../../public/img/icons/leaderboard.svg" />
          </div>
          <p class="text-xs">leaderboard</p>
        </router-link>
      </div>
      <div style="flex: 1">
        <router-link to="/profile" class="nav-icon pt-2 flex items-center flex-col">
          <div class="w-12 h-7 flex items-center justify-center">
            <img class="h-7" src="../../public/img/icons/profile.svg" />
          </div>
          <p class="text-xs">profile</p>
        </router-link>
      </div>
      <flash-points></flash-points>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FlashPoints from "./FlashPoints.vue";
export default {
  name: "Navigation",
  components: { FlashPoints },
  methods: {
    displayPubs() {
      this.$parent.callPubs();
      this.$store.commit("state/REMOVE_PUB");
      this.$store.commit("state/CLOSE_MAP");
    }
  },
  computed: {
    ...mapState({
      user: state => state.state.user
    })
  }
};
</script>

<style lang="scss">
.nav-icon {
  opacity: 0.6;
}

.router-link-exact-active.nav-icon {
  opacity: 1;
}
</style>
