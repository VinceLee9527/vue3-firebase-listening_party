import { createStore } from "vuex";

export default createStore({
  state: {
    albumModal: null,
  },
  mutations: {
    TOGGLE_ALBUM(state) {
      state.albumModal = !state.albumModal;
    },
  },
  actions: {},
  modules: {},
});
