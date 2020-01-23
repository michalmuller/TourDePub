<template>
  <div id="pub">pub id: {{ $route.params.id }}</div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from 'vuex';
import user from '../modules/user';

export default {
  name: 'pub',
  data() {
    return {
      loading: true,
    };
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
