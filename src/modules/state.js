const state = {
  loading: true,
};

const mutations = {
  LOADING: (state, payload) => {
    state.loading = payload;
  },
};

export default { state, mutations, namespaced: true };
