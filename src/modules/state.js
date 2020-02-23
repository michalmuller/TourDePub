const state = {
  loading: true,
  pubs: [],
  pub: null,
  user: null,
  users: null,
  points: '',
  mapActive: false,
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
    state.pub[state.user.uid].beer += payload;
    state.pubs.forEach((p, i) => {
      if (p.id === state.pub.id) {
        state.pubs[i][state.user.uid].beer += payload
        state.pubs[i].beer_total += payload
      }
    })
    state.pub.beer_total += payload;
    state.user.beer_total += payload;
  },

  ACTIVATE_MAP: state => {
    state.mapActive = true;
  },

  CLOSE_MAP: state => {
    state.mapActive = false
  },

  UPDATE_CHALLENGE: (state, payload) => {
    state.pubs.forEach((p, i) => {
      if (p.id === state.pub.id) {
        state.pubs[i][state.user.uid].challenge = payload
      }
    })
  },

  UPDATE_IMAGES: (state, payload) => {
    state.user.img_total += payload;
  },

  UPDATE_USERS: (state, payload) => {
    state.users = payload;
  },

  UPDATE_POINTS: (state, payload) => {
    state.points = payload
  },


  ONBOARDING_DONE: state => {
    state.user.onboarding = false
  },

  CHANGE_AVATAR: (state, payload) => {
    state.user.photoUrl = payload.url;
    state.users[payload.i].photoUrl = payload.url;
  }
};

export default { state, mutations, namespaced: true };
