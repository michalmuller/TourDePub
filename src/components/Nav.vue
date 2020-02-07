<template>
  <div class="fixed z-20 bottom-0 w-full shadow-top">
    <div id="nav" class="bg-white flex justify-around items-center py-2">
      <div>
        <router-link to="/slider" class="flex items-center">
          <div class="w-12 h-12 flex items-center justify-center">
            <img class="h-7 nav-icon" src="../../public/img/icons/question.svg" />
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/" @click.native="displayPubs" class="flex items-center">
          <div class="w-12 h-12 flex items-center justify-center">
            <img class="h-8 nav-icon" src="../../public/img/icons/beer.svg" />
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/profile" class="flex items-center">
          <div class="w-12 h-12 flex items-center justify-center">
            <img class="h-7 nav-icon" src="../../public/img/icons/profile.svg" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Navigation",
  methods: {
    displayPubs() {
      this.$store.commit("state/REMOVE_PUB");
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
  opacity: 0.7;
}

.router-link-exact-active {
  div {
    background-color: #edf2f8;
    border-radius: 30px;
    .nav-icon {
      opacity: 1;
    }
  }
}
</style>
