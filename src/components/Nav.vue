<template>
  <div class="fixed z-10 bottom-0 w-full">
    <div id="nav" class="bg-black flex justify-around">
      <div class="">
        <router-link to="/slider">
          <img class="h-8 m-3" src="../../public/img/icons/home.svg" />
        </router-link>
      </div>
      <div>
        <router-link to="/">
          <img class="h-8 m-3" src="../../public/img/icons/home.svg" />
        </router-link>
      </div>
      <div>
        <router-link to="/profile">
          <img class="h-8 m-3" src="../../public/img/icons/user.svg" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Navigation',
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>

<style lang="scss"></style>
