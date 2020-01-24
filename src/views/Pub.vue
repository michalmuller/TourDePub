<template>
  <div id="pub">
    <div id="header" class="h-40 w-full bg-gradient-primary z-10 fixed top-0 shadow-md">
      <img src="../../public/img/circle_overlay.png" class="absolute" style="width:52%" />
    </div>
    <div class="mt-2 relative z-20">
      <div class="px-6 py-3 w-20 z-30">
        <router-link to="/" class="w-16">
          <img src="../../public/img/icons/arow_back.svg" class="w-8 h-8" alt />
        </router-link>
      </div>
      <div class="bg-white mx-3 mt-5 h-64 relative rounded-t-large">
        <div class="p-3 flex text-lg font-bold text-gray-800 justify-center">{{ $route.params.id }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from "vuex";
import user from "../modules/user";
import state from "../modules/state";

export default {
  name: "pub",
  props: ["pub"],
  data() {
    return {
      loading: true
    };
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user,
      pubs: state => state.state.pubs
    })
  }
};
</script>

<style lang="scss" scoped></style>
