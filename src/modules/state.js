const state = {
  loading: true,
  pubs: [],
  pub: null,
  user: null,
  users: null,
};

const mutations = {
  AUTH_USER: (state, payload) => {
    state.user = payload;
  },

  MERGE_USERS: (state, payload) => {
    state.user = { ...state.user, ...payload }
  },

  LOGOUT_USER: state => {
    state.user = null;
    state.pub = null;
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
    state.pub.beer_total += payload;
    state.user.beer_total += payload;
  },
  UPDATE_IMAGES: (state, payload) => {
    state.user.img_total += payload;
  },

  UPDATE_USERS: (state, payload) => {
    state.users = payload;
  }
};

export default { state, mutations, namespaced: true };
