const state = {
  loading: true,
  pubs: [],
  pub: null,
  user: null,
};

const mutations = {
  AUTH_USER: (state, payload) => {
    state.user = payload;
  },

  LOGOUT_USER: state => {
    state.user = null;
  },

  LOADING: (state, payload) => {
    state.loading = payload;
  },

  UPDATE_PUBS: (state, payload) => {
    state.pubs = payload;
  },

  UPDATE_PUB: (state, payload) => {
    state.pub = payload;
  },

  REMOVE_PUB: state => {
    state.pub = null;
  },

  UPDATE_BEER: (state, payload) => {
    state.pub[state.user.uid] += payload;
    state.pubs[state.pub.id - 1][state.user.uid] += payload;
  },
};

export default { state, mutations, namespaced: true };
