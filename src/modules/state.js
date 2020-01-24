const state = {
  loading: true,
  pubs: [],
};

const mutations = {
  LOADING: (state, payload) => {
    state.loading = payload;
  },

  UPDATE_PUBS: (state, payload) => {
    state.pubs = payload;
  },
};

export default { state, mutations, namespaced: true };
