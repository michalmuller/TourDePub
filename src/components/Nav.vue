<template>
  <div class="fixed z-20 bottom-0 w-full shadow-top">
    <div id="nav" class="bg-white flex justify-around items-center">
      <div>
        <router-link to="/slider">
          <img class="h-8 m-3" src="../../public/img/icons/question.svg" />
        </router-link>
      </div>
      <div>
        <router-link to="/" @click.native="displayPubs">
          <img class="h-10 m-3" src="../../public/img/icons/beer.svg" />
        </router-link>
      </div>
      <div>
        <router-link to="/profile">
          <img class="h-8 m-3" src="../../public/img/icons/profile.svg" />
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

<style lang="scss"></style>
