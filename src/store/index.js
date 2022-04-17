import { createStore } from "vuex";
import { getDocs } from "firebase/firestore";
import albumsColRef from "../firebase/firebaseInit";

export default createStore({
  state: {
    albumData: [],
    albumModal: null,
    modalActive: null,
  },
  getters: {
    albumData(state) {
      return state.albumData;
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
          };
          commit("SET_ALBUM_DATA", data);
        }
      });
    },
  },
  modules: {},
});
