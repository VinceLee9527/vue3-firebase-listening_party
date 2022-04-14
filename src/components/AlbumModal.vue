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
      overflow-hidden
      md:top-0
    "
  >
    <form
      @submit.prevent="submitForm"
      class="relative p-14 max-w-2xl w-full bg-black"
    >
      <Loading v-show="loading" />
      <h1 v-if="!editInvoice" class="text-2xl font-bold mb-8">New Album</h1>
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
        </div>
        <!-- Invoice Work Details -->
        <div class="invoice-work flex flex-col">
          <div class="work-items">
            <h2 class="text-md font-medium my-5 text-l_purple">Ratings</h2>
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
            v-if="!editAlbum"
            type="submit"
            @click="saveDraft"
            class="button bg-d_purple font-bold"
          >
            Save Draft
          </button>
          <button
            v-if="!editAlbum"
            type="submit"
            @click="publishAlbum"
            class="button bg-l_purple font-bold"
          >
            Create Invoice
          </button>
          <button
            v-if="editAlbum"
            type="sumbit"
            class="button bg-d_purple font-bold"
          >
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { uid } from "uid";
import albumsColRef from "../firebase/firebaseInit";
import { addDoc } from "firebase/firestore";
import Loading from "./Loading.vue";

export default {
  name: "albumModal",
  components: { Loading },
  setup() {
    const loading = ref(false);
    const albumName = ref(null);
    const artistName = ref(null);
    const releaseDate = ref(null);
    const genre = ref(null);
    const albumPending = ref(null);
    const albumDraft = ref(null);
    const albumRatingList = ref([]);
    const ratingTotal = ref(0);
    const albumWrap = ref(null);

    const store = useStore();
    const addRating = () => {
      albumRatingList.value.push({
        id: uid(),
        reviewer: "",
        rating: 0,
      });
    };

    const deleteRating = (id) => {
      albumRatingList.value = albumRatingList.value.filter(
        (rating) => rating.id !== id
      );
    };

    const calcRatingTotal = () => {
      ratingTotal.value = 0;
      ratingTotal.value =
        albumRatingList.value.reduce(
          (total, next) => total + Number(next.rating),
          0
        ) / albumRatingList.value.length;
    };

    const checkClick = (e) => {
      if (e.target === albumWrap.value) {
        store.commit("TOGGLE_MODAL");
      }
    };

    const uploadAlbum = async () => {
      if (albumRatingList.value.length <= 0) {
        alert("Please fill out rating");
        return;
      }
      loading.value = true;
      calcRatingTotal();

      const addedDoc = await addDoc(albumsColRef, {
        albumId: uid(6),
        albumName: albumName.value,
        artistName: artistName.value,
        releaseDate: releaseDate.value,
        genre: genre.value,
        albumPending: albumPending.value,
        albumDraft: albumDraft.value,
        albumRatingList: albumRatingList.value,
        ratingTotal: ratingTotal.value,
      });
      console.log(addedDoc);
      loading.value = false;
      store.commit("TOGGLE_ALBUM");
    };

    return {
      loading,
      albumName,
      artistName,
      releaseDate,
      genre,
      albumPending,
      albumDraft,
      albumRatingList,
      ratingTotal,
      uploadAlbum,
      calcRatingTotal,
      addRating,
      deleteRating,
      checkClick,
      albumWrap,
      closeAlbum: () => store.commit("TOGGLE_ALBUM"),
      publishAlbum: () => (albumPending.value = true),
      saveDraft: () => (albumDraft.value = true),
      submitForm: () => uploadAlbum(),
    };
  },
};
</script>

<style>
</style>