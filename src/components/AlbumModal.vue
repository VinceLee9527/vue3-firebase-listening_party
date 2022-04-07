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
      <!-- <Loading v-show="loading" />
      <h1 v-if="!editInvoice" class="text-2xl font-bold mb-8">New Album</h1>
      <h1 v-else>Edit Album</h1> -->

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
              <tr class="table-heading flex">
                <th class="item-name">Reviewer</th>
                <th class="qty">Rating</th>
              </tr>
              <tr
                class="table-items flex"
                v-for="(item, index) in invoiceItemList"
                :key="index"
              >
                <td class="item-name">
                  <input type="text" v-model="item.itemName" />
                </td>
                <td class="qty"><input type="text" v-model="item.qty" /></td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <img
                  @click="deleteInvoiceItem(item.id)"
                  src="@/assets/images/icon-delete.svg"
                  alt=""
                />
              </tr>
            </table>

            <div
              @click="addNewInvoiceItem"
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

export default {
  name: "albumModal",
  setup() {
    // const loading = ref(false);
    const albumName = ref(null);
    const artistName = ref(null);
    const releaseDate = ref(null);
    const genre = ref(null);
    const invoicePending = ref(null);
    const invoiceDraft = ref(null);
    const invoiceItemList = ref([]);
    const invoiceTotal = ref(0);

    const store = useStore();

    return {
      albumName,
      artistName,
      releaseDate,
      genre,
      invoicePending,
      invoiceDraft,
      invoiceItemList,
      invoiceTotal,
      closeAlbum: () => store.commit("TOGGLE_ALBUM"),
    };
  },
};
</script>

<style>
</style>