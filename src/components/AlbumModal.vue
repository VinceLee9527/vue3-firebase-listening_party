<template>
  <div
    @click="checkClick"
    ref="albumWrap"
    class="
      flex flex-col
      text-white
      fixed
      top-21
      left-21
      h-screen
      w-full
      overflow-auto
      md:top-0
      no-scrollbar
    "
  >
    <form
      @submit.prevent="submitForm"
      class="relative p-14 max-w-2xl w-full bg-black"
    >
      <Loading v-show="loading || isDisabled" />
      <h1 v-if="!editAlbum" class="text-2xl font-bold mb-8">New Album</h1>
      <h1 v-else class="text-2xl font-bold mb-8">Edit Album</h1>
      <!-- <h1 v-else>Edit Album</h1> -->

      <!-- Bill From -->
      <div class="album-modal">
        <div class="album flex flex-col">
          <h2 class="text-md font-medium mb-5 text-l_purple">Album Info</h2>
          <div class="flex flex-col">
            <label for="albumName">Album Name</label>
            <input
              required
              type="text"
              id="albumName"
              class="w-96"
              v-model="albumName"
            />
          </div>
          <div class="flex flex-col">
            <label for="artistName">Artist Name</label>
            <input
              required
              type="text"
              id="artistName"
              class="w-96"
              v-model="artistName"
            />
          </div>
          <div class="flex justify-start">
            <div class="flex flex-col mr-12">
              <label for="releaseDate">Release Date</label>
              <input
                required
                type="date"
                id="releaseDate"
                class="w-40"
                v-model="releaseDate"
              />
            </div>
            <div class="input flex flex-col">
              <label for="genre">Genre</label>
              <select
                required
                type="text"
                id="genre"
                class="w-44"
                v-model="genre"
              >
                <option value="" disabled selected>Select Genre</option>
                <option>Pop</option>
                <option>Soul</option>
                <option>Rock</option>
                <option>Indie</option>
                <option>Hip-hop</option>
                <option>RnB</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <div
                @click="imageInput"
                class="
                  flex
                  items-center
                  justify-center
                  button
                  bg-l_purple
                  w-96
                  my-5
                "
              >
                <span class="text-lg font-bold">Upload Album Cover</span>
              </div>
              <div class="w-80 border-4 object-contain ml-7">
                <input
                  type="file"
                  ref="image"
                  class="hidden"
                  @change="previewImage"
                  accept="image/*"
                />

                <img v-if="imageData" :src="imageData" class="block w-auto" />
                <img
                  v-else
                  class="w-96 rounded-md mr-12"
                  src="@/assets/images/placeholder.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Invoice Work Details -->
        <div class="invoice-work flex flex-col">
          <div class="work-items">
            <h2 class="text-md font-medium mt-8 mb-5 text-l_purple">Ratings</h2>
            <table class="item-list">
              <tr class="table-heading flex mb-2">
                <th class="item-name mr-52">Reviewer</th>
                <th class="qty">Rating</th>
              </tr>
              <tr
                class="table-items flex justify-between"
                v-for="(rating, index) in albumRatingList"
                :key="index"
              >
                <td class="mr-5">
                  <input class="w-64" type="text" v-model="rating.reviewer" />
                </td>
                <td>
                  <input class="w-14" type="text" v-model="rating.rating" />
                </td>
                <img
                  @click="deleteRating(rating.id)"
                  src="@/assets/images/icon-delete.svg"
                  alt=""
                  class="w-5 h-7 ml-4 mt-1 cursor-pointer"
                />
              </tr>
            </table>

            <div
              @click="addRating"
              class="
                flex
                button
                bg-d_purple
                justify-center
                items-center
                w-96
                mt-8
              "
            >
              <div
                class="
                  mr-1
                  rounded-full
                  p-1
                  items-center
                  justify-center
                  bg-white
                "
              >
                <img
                  class="w-2.5 h-2.5"
                  src="@/assets/images/icon-plus.svg"
                  alt=""
                />
              </div>
              <p class="text-sm">Add New Ratings</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Save/Exit -->
      <div class="flex mt-14 justify-between w-96">
        <div class="left">
          <button
            type="button"
            @click="closeAlbum"
            class="button bg-red font-bold"
          >
            Cancel
          </button>
        </div>
        <div class="right flex">
          <button
            :disabled="isDisabled"
            v-if="!editAlbum"
            type="submit"
            @click="publishAlbum"
            class="button bg-l_purple font-bold"
          >
            Create Album
          </button>
          <button
            :disabled="isDisabled"
            v-if="editAlbum"
            type="submit"
            @click="updateAlbum(docId)"
            class="button bg-l_purple font-bold"
          >
            Update Album
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { uid } from "uid";
import { useRoute } from "vue-router";
import { albumsColRef } from "../firebase/firebaseInit";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import {
  uploadBytes,
  getStorage,
  ref as stRef,
  getDownloadURL,
} from "firebase/storage";
import Loading from "./Loading.vue";

export default {
  name: "albumModal",
  components: { Loading },
  setup() {
    const loading = ref(false);
    const albumId = ref(null);
    const albumName = ref(null);
    const artistName = ref(null);
    const releaseDate = ref(null);
    const genre = ref(null);
    const albumPending = ref(null);
    const albumDone = ref(null);
    const albumRatingList = ref([]);
    const ratingTotal = ref(0);
    const albumWrap = ref(null);
    const albumCover = ref();
    const image = ref();
    const isDisabled = ref();
    let imgUrl = ref(null);
    let imageData = ref(null);
    const editAlbum = computed(() => store.getters.editAlbum);
    const currentAlbum = ref([]);
    const route = useRoute();
    const docId = ref(null);
    const docRef = ref();

    const store = useStore();

    const addRating = () => {
      albumRatingList.value.push({
        id: uid(),
        reviewer: "",
        rating: 0,
      });
    };

    const previewImage = async (e) => {
      isDisabled.value = true;
      const imgId = uid(6);
      imgUrl.value = null;
      const storage = getStorage();
      const storageRef = stRef(storage, imgId);
      const { files } = e.target;
      albumCover.value = null;
      imageData.value = window.URL.createObjectURL(files[0]);

      const metadata = {
        contentType: "image/jpeg",
      };

      await uploadBytes(storageRef, e.target.files[0], metadata);
      console.log(`Uploaded image`);

      imgUrl.value = await getDownloadURL(stRef(storage, imgId));
      isDisabled.value = false;
    };

    const deleteRating = (id) => {
      albumRatingList.value = albumRatingList.value.filter(
        (rating) => rating.id !== id
      );
    };

    const calcRatingTotal = () => {
      ratingTotal.value = 0;
      ratingTotal.value = Math.round(
        albumRatingList.value.reduce(
          (total, next) => total + Number(next.rating),
          0
        ) / albumRatingList.value.length
      );
    };

    const checkClick = (e) => {
      if (e.target === albumWrap.value) {
        store.commit("TOGGLE_MODAL");
      }
    };

    const publishAlbum = async () => {
      if (albumRatingList.value.length <= 0) {
        alert("Please fill out rating");
        return;
      }
      loading.value = true;
      calcRatingTotal();

      await addDoc(albumsColRef, {
        albumId: uid(6),
        albumName: albumName.value,
        artistName: artistName.value,
        releaseDate: releaseDate.value,
        genre: genre.value,
        albumPending: true,
        albumDone: albumDone.value,
        albumRatingList: albumRatingList.value,
        ratingTotal: ratingTotal.value,
        imgUrl: imgUrl.value,
      });
      loading.value = false;
      store.commit("TOGGLE_ALBUM");
      store.dispatch("getAlbums");
    };

    const albumEditMode = async () => {
      await getCurrentAlbum();
      docId.value = currentAlbum.value.docId;
      albumId.value = currentAlbum.value.albumId;
      albumName.value = currentAlbum.value.albumName;
      artistName.value = currentAlbum.value.artistName;
      releaseDate.value = currentAlbum.value.releaseDate;
      genre.value = currentAlbum.value.genre;
      albumRatingList.value = currentAlbum.value.albumRatingList;
      albumId.value = currentAlbum.value.albumId;
      imageData.value = currentAlbum.value.imgUrl;
      imgUrl.value = currentAlbum.value.imgUrl;
    };

    const updateAlbum = async (id) => {
      let albumRef = doc(albumsColRef, id);
      docRef.value = albumRef;
      if (albumRatingList.value.length <= 0) {
        alert("Please fill out rating");
        return;
      }
      loading.value = true;
      calcRatingTotal();

      await updateDoc(docRef.value, {
        albumName: albumName.value,
        artistName: artistName.value,
        releaseDate: releaseDate.value,
        genre: genre.value,
        albumPending: true,
        albumDone: false,
        albumRatingList: albumRatingList.value,
        ratingTotal: ratingTotal.value,
        imgUrl: imgUrl.value,
      });
      loading.value = false;

      store.commit("CLEAR_ALBUM");
      store.dispatch("getAlbums");
      store.commit("TOGGLE_EDIT_ALBUM");
      store.commit("TOGGLE_ALBUM");
    };

    const getCurrentAlbum = async () => {
      await store.dispatch("getCurrentAlbum", route.params.albumId);
      currentAlbum.value = store.getters.currentAlbum[0];
    };

    const submitForm = () => {
      if (editAlbum.value === "true") {
        updateAlbum();
      } else if (editAlbum.value === "false") {
        publishAlbum();
        console.log("wtf");
      }
    };

    store.watch((getters) => getters.editAlbum, albumEditMode());

    return {
      loading,
      docId,
      albumId,
      albumName,
      artistName,
      releaseDate,
      genre,
      albumPending,
      albumDone,
      albumRatingList,
      ratingTotal,
      calcRatingTotal,
      addRating,
      deleteRating,
      checkClick,
      image,
      imageData,
      previewImage,
      albumWrap,
      imgUrl,
      isDisabled,
      editAlbum,
      albumEditMode,
      currentAlbum,
      getCurrentAlbum,
      updateAlbum,
      submitForm,
      imageInput: () => image.value.click(),
      closeAlbum: () => store.commit("TOGGLE_ALBUM"),
      publishAlbum,
    };
  },
};
</script>

<style>
</style>