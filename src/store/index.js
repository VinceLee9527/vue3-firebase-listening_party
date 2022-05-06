import { createStore } from "vuex";
import { getDocs } from "firebase/firestore";
import { albumsColRef } from "../firebase/firebaseInit";

export default createStore({
  state: {
    albumData: [],
    albumModal: null,
    modalActive: null,
    currentAlbumArray: null,
    editAlbum: null,
  },
  getters: {
    albumData(state) {
      return state.albumData;
    },
    currentAlbum(state) {
      return state.currentAlbumArray;
    },
    editAlbum(state) {
      return state.editAlbum;
    },
  },
  mutations: {
    TOGGLE_ALBUM(state) {
      state.albumModal = !state.albumModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_ALBUM_DATA(state, payload) {
      state.albumData.push(payload);
    },
    SET_CURRENT_ALBUM(state, payload) {
      state.currentAlbumArray = state.albumData.filter((album) => {
        return album.albumId === payload;
      });
    },
    TOGGLE_EDIT_ALBUM(state) {
      state.editAlbum = !state.editAlbum;
    },
    CLEAR_ALBUM(state) {
      state.albumData = [];
    },
  },
  actions: {
    async GET_ALBUMS({ commit, state }) {
      let albumsSnapShot = await getDocs(albumsColRef);
      albumsSnapShot.forEach((doc) => {
        if (!state.albumData.some((album) => album.docId === doc.id)) {
          const data = {
            docId: doc.id,
            albumId: doc.data().albumId,
            albumName: doc.data().albumName,
            artistName: doc.data().artistName,
            releaseDate: doc.data().releaseDate,
            genre: doc.data().genre,
            albumPending: doc.data().albumPending,
            albumDraft: doc.data().albumDraft,
            albumDone: doc.data().albumDone,
            albumRatingList: doc.data().albumRatingList,
            ratingTotal: doc.data().ratingTotal,
            imgUrl: doc.data().imgUrl,
          };
          commit("SET_ALBUM_DATA", data);
        }
      });
    },
    async getCurrentAlbum({ commit }, payload) {
      await this.dispatch("GET_ALBUMS");
      commit("SET_CURRENT_ALBUM", payload);
    },
  },
  modules: {},
});
