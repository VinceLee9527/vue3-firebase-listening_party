import { createStore } from "vuex";

export default createStore({
  state: {
    albumModal: null,
    modalActive: null,
  },
  mutations: {
    TOGGLE_ALBUM(state) {
      state.albumModal = !state.albumModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
  },
  actions: {},
  modules: {},
});
