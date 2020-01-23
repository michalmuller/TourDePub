const state = {
  user: null,
};

const mutations = {
  AUTH_USER: (state, payload) => {
    state.user = payload;
  },
  LOGOUT_USER: state => {
    state.user = null;
  },
};

export default { state, mutations, namespaced: true };
